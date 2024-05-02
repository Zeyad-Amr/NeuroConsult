import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultationRequestService } from './consultation-request.service';
import { ConsultationResponseDto, CreateConsultationRequestDto } from './dto/create-consultation-request.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
import { handleError } from '@/shared/http-error';
import { PatientService } from '@/patient/patient.service';
import * as net from 'net';
import { convertJSONToHL7, parseHL7ToJSON } from '@/shared/hl7-parser/hl7';

@Controller('consultation-request')
export class ConsultationRequestController {
  constructor(private readonly consultationRequestService: ConsultationRequestService,
    private patientService: PatientService) {
    const server = net.createServer((socket) => {
      socket.on('data', async (data) => {
        let jsonReq = parseHL7ToJSON(data.toString());
        const doctorResponse = jsonReq.consultationReqs.result;
        // check the json result from hl7-parser (even you were sending all the consultation data from the doctor server or just the response message from the doctor)
        // TODO: should add the result into db here so the frontend can access it
        await this.consultationRequestService.update(jsonReq.consultationReqs.id, doctorResponse);

      });

      socket.on('close', () => {
        console.log('Client disconnected from Server 2929:', socket.remoteAddress);
      });
    });

    server.listen(3001, 'localhost', () => {
      console.log('Doctor Server is listening on port 3002');
    });
  }



  @Post()
  async create(@Body() createConsultationRequestDto: CreateConsultationRequestDto) {
    try {
      const { vitals, patientId, ...restData } = createConsultationRequestDto
      const addVitals = await this.patientService.addMedicalData(patientId, { vitals })
      console.log("Diaa")
      const result = await this.consultationRequestService.create({ ...restData, patientId });

      const toSent = new ConsultationResponseDto()
      toSent.vitals = vitals
      toSent.consultationReqs = result
      this.sendRequestToDoctor(toSent)
    } catch (error) {
      handleError(error)
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.consultationRequestService.findAll();
    } catch (error) {
      handleError(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.consultationRequestService.findOne(id);
    } catch (error) {
      handleError(error)
    }
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.consultationRequestService.remove(id);
    } catch (error) {
      handleError(error)
    }
  }


  async sendRequestToDoctor(req: ConsultationResponseDto) {
    try {
      const client = new net.Socket();

      client.connect(3002, 'localhost', () => {

        const res = convertJSONToHL7(req)
        // TODO: here the req (contains the consultation data that should be sent to the doctor (check the patch method above to see the data))
        // the data that will be written it's just the hl7 message (so parse it to hl7 message before sending)
        client.write(res);
      });

      client.on('close', () => {
        console.log('Connection to Server 2929 closed');
      });

      return 'consultation requested';
    } catch (error) {
      handleError(error)
    }
  }

}
