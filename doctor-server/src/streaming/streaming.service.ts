import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  constructor(private readonly prisma: PrismaService) { }

  async getPatientsRequests() {
    return await this.prisma.response.findMany({ orderBy: { createdAt: 'desc' } });
    ;
  }

  findOne(id: number) {
    return `This action returns a #${id} streaming`;
  }
}
