import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  constructor(private readonly prisma: PrismaService) { }

  async getResults(id: string) {
    return await this.prisma.consultatinReq.findMany({ where: { patientId: id }, orderBy: { updatedAt: 'desc' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} streaming`;
  }
}
