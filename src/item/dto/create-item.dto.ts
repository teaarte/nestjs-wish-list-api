import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  quantity?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  platform?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  link: string;
}
