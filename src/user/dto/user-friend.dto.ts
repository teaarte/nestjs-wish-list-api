import { IsEmail, IsNotEmpty } from "class-validator";

export class UserFriendDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;
}