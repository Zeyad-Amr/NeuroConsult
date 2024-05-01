import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PatientRepo } from './patient.repo';
import { PrismaModule } from '@/shared/prisma-client/prisma.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [PatientController],
  providers: [PatientService, PatientRepo],
})
export class PatientModule { }
