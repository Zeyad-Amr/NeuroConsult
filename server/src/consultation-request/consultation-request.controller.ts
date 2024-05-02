import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultationRequestService } from './consultation-request.service';
import { CreateConsultationRequestDto } from './dto/create-consultation-request.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
import { handleError } from '@/shared/http-error';
import { PatientService } from '@/patient/patient.service';

@Controller('consultation-request')
export class ConsultationRequestController {
  constructor(private readonly consultationRequestService: ConsultationRequestService,
    private patientService: PatientService) { }

  @Post()
  async create(@Body() createConsultationRequestDto: CreateConsultationRequestDto) {
    try {
      const { vitals, patientId, ...restData } = createConsultationRequestDto
      const addVitals = await this.patientService.addMedicalData(patientId, { vitals })
      return await this.consultationRequestService.create({ ...restData, patientId });
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConsultationRequestDto: UpdateConsultationRequestDto) {
    try {
      return await this.consultationRequestService.update(id, updateConsultationRequestDto);
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
}
