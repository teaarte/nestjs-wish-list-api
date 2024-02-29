import { IsOptional, IsEmail, IsString } from "class-validator";

export class EditUserDTO{
    @IsEmail()
    @IsOptional()
    email?:string;

    @IsString()
    @IsOptional()
    fristName?:string

    @IsString()
    @IsOptional()
    LastName?:string
}