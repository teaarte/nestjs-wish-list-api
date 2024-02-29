import { IsEmail, IsNotEmpty } from "class-validator";

export class FriendItemsDto{
    @IsEmail()
    @IsNotEmpty()
    email:string
}