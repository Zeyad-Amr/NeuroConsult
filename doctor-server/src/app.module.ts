import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user/user.guard';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [UserModule, PatientModule],
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