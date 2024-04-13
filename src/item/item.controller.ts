import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ItemService } from './item.service';
import { GetUser } from '../auth/decorator';
import { CreateItemDto, EditItemDto, FriendItemsDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('items')
@ApiTags('Items')
@ApiBearerAuth()
export class ItemController {
  constructor(private itemService: ItemService) {}

  @ApiOperation({ summary: 'Get all items' })
  @Get()
  getItems(@GetUser('id') userId: number) {
    return this.itemService.getItems(userId);
  }

  @ApiOperation({ summary: 'Get item by id' })
  @Get(':id')
  getItemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    return this.itemService.getItemById(userId, itemId);
  }

  @ApiOperation({ summary: 'Create item' })
  @Post()
  createItem(@GetUser('id') userId: number, @Body() dto: CreateItemDto) {
    return this.itemService.createItem(userId, dto);
  }

  @ApiOperation({ summary: 'Edit item' })
  @Patch(':id')
  editItemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
    @Body() dto: EditItemDto,
  ) {
    return this.itemService.editItemById(userId, itemId, dto);
  }

  @ApiOperation({ summary: 'Delete item' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteItemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
  ) {
    return this.itemService.deleteItemById(userId, itemId);
  }

  @ApiOperation({ summary: 'Get friend items' })
  @Get('friend')
  getItemsOfFriend(@GetUser('id') userId: number, @Body() dto: FriendItemsDto) {
    return this.itemService.getItemsOfFriend(userId, dto);
  }
}
