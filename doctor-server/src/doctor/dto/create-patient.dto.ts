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

export class Consultation {
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
    radiologyImage: string;
}


export class DoctorResp {
    id: string;
    requestMetadata: ConsultationReqs;
    DoctorResponse: string;
    createdAt: string;
}