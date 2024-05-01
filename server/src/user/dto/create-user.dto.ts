import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
}
