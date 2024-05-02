import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { DoctorDto, DoctorUpdateDto } from './dto/create-patient.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly primsa: PrismaService) { }

  async create(dto: DoctorDto) {
    const consultation = await this.primsa.response.create({ data: { requestMetadata: dto.hl7Message, PID: dto.PID } });
    return consultation;
  }

  async update(id: string, dto: DoctorUpdateDto) {
    const consultation = await this.primsa.response.update({
      where: { id: id },
      data: { DoctorResponse: dto.ResponseMessage }
    });
    return consultation;
  }

}
