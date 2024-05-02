import { Controller, Get, Post, Body, Patch, Param, Delete, Sse, Redirect } from '@nestjs/common';
import { handleError } from '@/shared/http-error';
import { Consultation, DoctorDto, DoctorUpdateDto } from './dto/create-patient.dto';
import { DoctorService } from './doctor.service';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import * as net from 'net';
import { parseHL7ToJSON } from '@/shared/hl7-parser/hl7';

@Controller('consultation')
export class PatientController {
  constructor(private readonly doctor: DoctorService, private readonly prisma: PrismaService) {
    const server = net.createServer((socket) => {
      socket.on('data', async (data) => {
        let jsonReq = parseHL7ToJSON(data.toString());
        const d = new DoctorDto();
        // d.hl7Message = jsonReq
        // d.PID = jsonReq.PID;
        await this.doctor.create(new DoctorDto());
      });

      socket.on('close', () => {
        console.log('Client disconnected from Server 2929:', socket.remoteAddress);
      });
    });

    server.listen(3002, 'localhost', () => {
      console.log('Doctor Server is listening on port 3002');
    });
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
        // TODO: here the req (contains the consultation result (check the patch method above to see the data))
        // the data that will be written it's just the hl7 message
        client.write('HL7 Message');
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
