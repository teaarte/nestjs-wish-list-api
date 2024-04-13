import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FriendItemsDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
