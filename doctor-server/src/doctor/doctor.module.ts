import { Module } from '@nestjs/common';
import { PatientController } from './doctor.controller';
import { PrismaModule } from '@/shared/prisma-client/prisma.module';
import { DoctorService } from './doctor.service';
import { PrismaService } from '@/shared/prisma-client/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [PatientController],
  providers: [DoctorService, PrismaService],
  exports: []
})
export class DoctorModule { }
