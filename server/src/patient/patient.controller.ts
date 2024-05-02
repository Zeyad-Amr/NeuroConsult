import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { handleError } from '@/shared/http-error';
import { UserService } from '@/user/user.service';
import { PatientDto } from './dto/create-patient.dto';
import * as net from 'net';
import { parseHL7ToJSON } from '@/shared/hl7-parser/hl7';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {
    const server = net.createServer((socket) => {
      socket.on('data', async (data) => {
        let jsonReq = parseHL7ToJSON(data.toString());
        // check the json result from hl7-parser (even you were sending all the consultation data from the doctor server or just the response message from the doctor)
        // d.hl7Message = jsonReq
        // d.PID = jsonReq.PID;
        // TODO: should add the result into db here so the frontend can access it
      });

      socket.on('close', () => {
        console.log('Client disconnected from Server 2929:', socket.remoteAddress);
      });
    });

    server.listen(3002, 'localhost', () => {
      console.log('Doctor Server is listening on port 3002');
    });
  }


  @Post()
  async create(@Body() patientDto: PatientDto) {
    try {
      const newPatient = await this.patientService.create(patientDto)
      return newPatient;
    } catch (error) {
      handleError(error)
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.patientService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.patientService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  addMedicalData(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.addMedicalData(id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.patientService.remove(id);
    } catch (error) {
      throw error
    }
  }

  @Post('submitconsultation')
  async submitConsultation(@Body() consultation: any) {
    try {
      // TODO: after the consultation is submitted, the consultation data should be sent to the doctor (the new line)
      this.sendRequestToDoctor(consultation);
    } catch (error) {
      handleError(error)
    }
  }

  async sendRequestToDoctor(req: any) {
    try {
      const client = new net.Socket();

      client.connect(3002, 'localhost', () => {
        // TODO: here the req (contains the consultation data that should be sent to the doctor (check the patch method above to see the data))
        // the data that will be written it's just the hl7 message (so parse it to hl7 message before sending)
        client.write('HL7 Message');
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
