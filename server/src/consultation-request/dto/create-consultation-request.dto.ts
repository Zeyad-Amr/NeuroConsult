import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateConsultationRequestDto {
    @IsNotEmpty()
    @IsString()
    complaint: string;

    @IsOptional()
    patientId?: string;

    @IsOptional()
    vitals?
}
