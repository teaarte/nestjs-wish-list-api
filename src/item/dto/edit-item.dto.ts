import { IsString, IsOptional, IsNumber } from "class-validator";

export class EditItemDto{
    @IsString()
    @IsOptional()
    title?:string

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
    @IsOptional()
    link?:string

}