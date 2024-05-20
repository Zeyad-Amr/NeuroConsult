import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user/user.guard';
import { PatientModule } from './patient/patient.module';
import { ConsultationRequestModule } from './consultation-request/consultation-request.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [UserModule, PatientModule, ConsultationRequestModule, StreamingModule],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: UserGuard,
    // },
    AppService
  ],
})
export class AppModule { }
