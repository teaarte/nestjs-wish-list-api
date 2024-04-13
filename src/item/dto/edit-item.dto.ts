import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditItemDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title?: string;

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
  @IsOptional()
  @ApiProperty()
  link?: string;
}
