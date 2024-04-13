import { IsOptional, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserDTO {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  fristName?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  LastName?: string;
}
