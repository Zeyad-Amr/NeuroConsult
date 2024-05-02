import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { handleError } from '@/shared/http-error';
import { UserService } from '@/user/user.service';
import { PatientDto } from './dto/create-patient.dto';
import { parseHL7ToJSON } from '@/shared/hl7-parser/hl7';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {

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




}
