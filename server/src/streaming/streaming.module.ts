import { Module } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma-client/prisma.service';
import { StreamingService } from './streaming.service';
import { StreamingController } from './streaming.controller';
import { PatientModule } from '@/patient/patient.module';

@Module({
  imports: [PatientModule],
  controllers: [StreamingController],
  providers: [StreamingService, PrismaService],
})
export class StreamingModule { }
