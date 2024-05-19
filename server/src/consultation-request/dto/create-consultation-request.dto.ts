import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateConsultationRequestDto {
    @IsNotEmpty()
    @IsString()
    complaint: string;

    @IsOptional()
    patientId?: string;

    @IsOptional()
    vitals?


    radiologyImage: string;
}

export class ConsultationResponseDto {
    vitals: Vitals;

    consultationReqs: ConsultationReqs;
}

interface Vitals {
    id: string;
    pulse: number;
    bp: string;
    respiration: number;
    pso2: number;
}

interface ConsultationReqs {
    id: string;
    complaint: string;
}