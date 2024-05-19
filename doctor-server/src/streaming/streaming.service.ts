import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  constructor(private readonly prisma: PrismaService) { }

  async getPatientsRequests() {
    const res = await this.prisma.response.findMany({ orderBy: { createdAt: 'desc' } });
    ;
    res.forEach((item) => {
      const met = JSON.parse(item.requestMetadata.toLocaleString())
      item["ConsultationRequest"] = met
      item.requestMetadata = ""
    })

    return res
  }

  findOne(id: number) {
    return `This action returns a #${id} streaming`;
  }
}
