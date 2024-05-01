import { IsNotEmpty, IsString } from "class-validator";

export class CreateConsultationRequestDto {
    @IsNotEmpty()
    @IsString()
    complaint: string;
}
