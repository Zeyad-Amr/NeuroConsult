import { Injectable } from '@nestjs/common';
import { CreateConsultationRequestDto } from './dto/create-consultation-request.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
import { ConsultatinReqRepo } from './consultation-request.repo';

@Injectable()
export class ConsultationRequestService {
  constructor(private constReq: ConsultatinReqRepo) { }

  async create(constReqDto: CreateConsultationRequestDto) {
    try {
      const constReq = await this.constReq.create(constReqDto)
      return constReq
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const constReqs = await this.constReq.getAll()
      return constReqs
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const constReq = await this.constReq.getByID(id)
      return constReq
    } catch (error) {
      throw error
    }
  }

  async update(id: string, data: UpdateConsultationRequestDto) {
    try {
      const constReq = await this.constReq.update(id, data)
      return constReq
    } catch (error) {
      throw error
    }
  }



  async remove(id: string) {
    try {
      const constReq = await this.constReq.delete(id)
      return constReq
    } catch (error) {
      throw error
    }
  }
}
