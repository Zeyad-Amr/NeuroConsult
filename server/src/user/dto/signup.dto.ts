import { PatientDto } from "@/patient/dto/create-patient.dto";
import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { CreateUserDto } from "./create-user.dto";


export class SignupDto {

    @IsObject()
    @ValidateNested()
    @Type(() => PatientDto)
    patient: PatientDto;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateUserDto)
    auth: CreateUserDto
}