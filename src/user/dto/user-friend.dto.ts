import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserFriendDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
