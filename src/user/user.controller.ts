import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDTO, UserFriendDto } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  @ApiOperation({ summary: 'Get myself' })
  getMe(@GetUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Edit user' })
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDTO) {
    return this.userService.editUser(userId, dto);
  }

  @ApiOperation({ summary: 'Be friend' })
  @Post('befriend')
  befriendUser(@GetUser('id') userId: number, @Body() dto: UserFriendDto) {
    return this.userService.befriendUser(userId, dto);
  }

  @ApiOperation({ summary: 'Remove friend' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('breakup')
  removeFriendUser(@GetUser('id') userId: number, @Body() dto: UserFriendDto) {
    return this.userService.removeFriendUser(userId, dto);
  }
  @ApiOperation({ summary: 'List friends' })
  @Get('friends')
  getFriends(@GetUser('id') userId: number) {
    return this.userService.getFriends(userId);
  }
}
