import { PartialType } from '@nestjs/mapped-types';
import { PatientDto } from './create-patient.dto';
import { Prisma } from '@prisma/client';
import { IsArray, IsDateString, IsObject, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class UpdatePatientDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    gender?: string;

    @IsDateString()
    @IsOptional()
    birthDate?: string | Date;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsArray()
    @IsString()
    comorbidities?: String[];

    @IsOptional()
    @IsString()
    bloodType?: string;

    @IsOptional()
    @IsObject()
    vitals?: Prisma.VitalsCreateInput;

    @IsOptional()
    @IsObject()
    medications?: Prisma.MedicationCreateInput;

    @IsOptional()
    @IsObject()
    allergies?: Prisma.AllergyCreateInput;

    @IsOptional()
    @IsObject()
    diagnosis?: Prisma.DiagnosisCreateInput;

    @IsOptional()
    @IsObject()
    labs?: Prisma.LabCreateInput;

    @IsOptional()
    @IsObject()
    imaging?: Prisma.ImagingCreateInput;

}
