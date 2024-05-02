import { IsNotEmpty, IsString } from "class-validator";

export class DoctorDto {
    @IsString()
    @IsNotEmpty()
    hl7Message: string;

    @IsString()
    @IsNotEmpty()
    PID: string;
}

export class DoctorUpdateDto {
    @IsString()
    @IsNotEmpty()
    ResponseMessage: string;
}

export interface Consultation {
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