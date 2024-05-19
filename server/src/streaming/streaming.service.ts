import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  constructor(private readonly prisma: PrismaService) { }

  async getResults() {
    return await this.prisma.consultatinReq.findMany({ orderBy: { updatedAt: 'desc' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} streaming`;
  }
}
