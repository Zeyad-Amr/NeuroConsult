import { CreateUserDto } from "@/user/dto/create-user.dto";
import { Prisma } from "@prisma/client";
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
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    address?: string;

    @IsOptional()
    @IsArray()
    @IsString()
    comorbidities?: string[];

    @IsNotEmpty()
    @IsString()
    bloodType: string;
}
