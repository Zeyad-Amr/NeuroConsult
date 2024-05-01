import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { handleError } from '@/shared/http-error';
import { UserService } from '@/user/user.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService, private readonly userService: UserService) { }

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const { patient, auth } = createPatientDto
      const newPatient = await this.patientService.create(patient)
      const newUser = await this.userService.create({ ...auth, patientId: newPatient.id })
      return newUser;
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
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
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
