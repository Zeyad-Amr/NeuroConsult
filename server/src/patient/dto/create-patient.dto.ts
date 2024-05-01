import { CreateUserDto } from "@/user/dto/create-user.dto";
import { $Enums, Prisma } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsObject, IsOptional, IsPhoneNumber, IsString, MinLength, ValidateNested } from "class-validator";

export class PatientDto implements Prisma.PatientCreateInput {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    gender: string;

    @IsDateString()
    @IsNotEmpty()
    birthDate: string | Date;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address?: string;

    @IsOptional()
    @IsArray()
    @IsString()
    comorbidities?: Prisma.PatientCreatecomorbiditiesInput | $Enums.Comorbidity[];

    @IsNotEmpty()
    @IsString()
    bloodType: string;
}


export class CreatePatientDto {

    @IsObject()
    @ValidateNested()
    @Type(() => PatientDto)
    patient: PatientDto;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateUserDto)
    auth: CreateUserDto
}