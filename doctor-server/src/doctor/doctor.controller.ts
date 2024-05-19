import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, Redirect } from '@nestjs/common';
import { handleError } from '@/shared/http-error';
import { Consultation, DoctorDto, DoctorResp, DoctorUpdateDto } from './dto/create-patient.dto';
import { DoctorService } from './doctor.service';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import * as net from 'net';
import { convertJSONToHL7, parseHL7ToJSON } from '@/shared/hl7-parser/hl7';
import { json } from 'stream/consumers';

@Controller('consultation')
export class PatientController {
  constructor(private readonly doctor: DoctorService, private readonly prisma: PrismaService) {
    const server = net.createServer((socket) => {
      socket.on('data', async (data) => {
        console.log('Data received from patient Server:', data.toString());

        let jsonReq = parseHL7ToJSON(data.toString());
        const d = new Consultation();

        d.consultationReqs = jsonReq.consultationReqs;
        const complaintString = d.consultationReqs.complaint;
        const delimiter = " patientData ";
        const [originalComplaint, p] = complaintString.split(delimiter);
        d.consultationReqs.complaint = originalComplaint;

        const patient = JSON.parse(p)
        console.log(patient)




        d.vitals = jsonReq.vitals;
        d.consultationReqs.patientName = patient.name;
        d.consultationReqs.patientGender = patient.gender;
        d.consultationReqs.patientBirthDate = patient.birthDate;
        d.consultationReqs.radiologyImage = d.vitals.id.substring(6);
        d.vitals.id = "10"

        await this.doctor.create(d);
      });

      socket.on('close', () => {
        console.log('Client disconnected from Server 2929:', socket.remoteAddress);
      });
    });

    server.listen(3002, 'localhost', () => {
      console.log('Doctor Server is listening on port 3002');
    });
  }

  @Get()
  async getall() {
    try {
      const res = await this.prisma.response.findMany();
      res.forEach((item) => {
        const met = JSON.parse(item.requestMetadata.toLocaleString())
        item["ConsultationRequest"] = met
        item.requestMetadata = ""
      })

      return res
    } catch (error) {

    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dt: DoctorUpdateDto) {
    try {
      const res = await this.doctor.update(id, dt);
      this.sendResult(res);
      return "Consultation updated successfully"
    } catch (error) {
      handleError(error)
    }
  }


  async sendResult(req: any) {
    try {
      const client = new net.Socket();

      client.connect(3001, 'localhost', () => {
        const jsonRes = JSON.parse(req.requestMetadata);
        jsonRes.consultationReqs.result = req.DoctorResponse;
        jsonRes.PID = undefined
        const toSend = convertJSONToHL7(jsonRes);
        console.log(jsonRes.consultationReqs)
        console.log("to send", toSend)
        client.write(toSend);
      });

      client.on('close', () => {
        console.log('Connection to Server 2929 closed');
      });

      return 'result sent';
    } catch (error) {
      handleError(error)
    }
  }
}
