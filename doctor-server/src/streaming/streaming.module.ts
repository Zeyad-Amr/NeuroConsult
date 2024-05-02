import { Module } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { DoctorModule } from '@/doctor/doctor.module';

@Module({
  imports: [DoctorModule],
  controllers: [StreamingController],
  providers: [StreamingService, PrismaService],
})
export class StreamingModule { }
