import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateItemDto{
    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    @IsOptional()
    description?:string

    @IsNumber()
    @IsOptional()
    quantity?:number

    @IsString()
    @IsOptional()
    platform?:string

    @IsString()
    @IsNotEmpty()
    link:string

}