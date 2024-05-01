import { Injectable } from '@nestjs/common';
import { PatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientRepo } from './patient.repo';

@Injectable()
export class PatientService {
  constructor(private patientRepo: PatientRepo) { }

  async create(createPatientDto: PatientDto) {
    try {
      const patient = await this.patientRepo.create(createPatientDto)
      return patient
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const patients = await this.patientRepo.getAll()
      return patients
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const patient = await this.patientRepo.getByID(id)
      return patient
    } catch (error) {
      throw error
    }
  }


  async addMedicalData(id: string, updatePatientDto: UpdatePatientDto) {
    try {
      const patient = await this.patientRepo.addMedicalData(id, updatePatientDto)
      return patient
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const patient = await this.patientRepo.delete(id)
      return patient
    } catch (error) {
      throw error
    }
  }
}
