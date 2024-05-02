import { Module } from '@nestjs/common';
import { ConsultationRequestService } from './consultation-request.service';
import { ConsultationRequestController } from './consultation-request.controller';
import { ConsultatinReqRepo } from './consultation-request.repo';
import { PrismaModule } from '@/shared/prisma-client/prisma.module';
import { PatientModule } from '@/patient/patient.module';

@Module({
  imports: [PrismaModule, PatientModule],
  controllers: [ConsultationRequestController],
  providers: [ConsultationRequestService, ConsultatinReqRepo],
})
export class ConsultationRequestModule { }
