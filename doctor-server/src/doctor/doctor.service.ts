import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';
import { Consultation, DoctorDto, DoctorUpdateDto } from './dto/create-patient.dto';
import { convertJSONToHL7 } from '@/shared/hl7-parser/hl7';

@Injectable()
export class DoctorService {
  constructor(private readonly primsa: PrismaService) { }

  async create(dto: Consultation) {
    const metaData = JSON.stringify(dto)
    const consultation = await this.primsa.response.create({ data: { requestMetadata: metaData, id: dto.consultationReqs.id } });
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
