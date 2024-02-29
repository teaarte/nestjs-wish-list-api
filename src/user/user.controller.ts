import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDTO, UserFriendDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private userService:UserService){}
    @Get('me')
    getMe(@GetUser() user: User){
        return user;
    }

    @Patch()
    editUser(@GetUser('id') userId: number,@Body() dto:EditUserDTO){
        return this.userService.editUser(userId,dto);
    }

    @Post('befriend')
    befriendUser(@GetUser('id') userId: number,@Body() dto:UserFriendDto){
        return this.userService.befriendUser(userId,dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('breakup')
    removeFriendUser(@GetUser('id') userId: number,@Body() dto:UserFriendDto){
        return this.userService.removeFriendUser(userId,dto);
    }

    @Get('friends')
    getFriends(@GetUser('id') userId: number){
        return this.userService.getFriends(userId);
    }
}
