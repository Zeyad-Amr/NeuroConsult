import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/.*[0-9].*/, {
        message: 'password must contain at least one number',
    })
    password: string;

    @IsOptional()
    @IsEmail()
    email: string;

    patient?: Prisma.PatientCreateNestedOneWithoutUserInput;
}
