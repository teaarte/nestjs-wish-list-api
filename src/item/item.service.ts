import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto, EditItemDto, FriendItemsDto } from './dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  getItems(userId: number) {
    return this.prisma.item.findMany({
      where: {
        userId: userId,
      },
    });
  }

  getItemById(userId: number, itemId: number) {
    return this.prisma.item.findUnique({
      where: {
        id: itemId,
        userId,
      },
    });
  }

  async createItem(userId: number, dto: CreateItemDto) {
    const item = await this.prisma.item.create({
      data: {
        userId,
        ...dto,
      },
    });
    return item;
  }

  async editItemById(userId: number, itemId: number, dto: EditItemDto) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item || item.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    return await this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteItemById(userId: number, itemId: number) {
    const item = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item || item.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    await this.prisma.item.delete({
      where: {
        id: itemId,
      },
    });
  }

  async getItemsOfFriend(userId: number, dto: FriendItemsDto) {
    const friend = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!friend) {
      throw new ForbiddenException("friend's email is not registered");
    }
    const id1 = Math.min(userId, friend.id);
    const id2 = Math.max(userId, friend.id);

    const exists = await this.prisma.friendship.findUnique({
      where: {
        userId_friendId: {
          userId: id1,
          friendId: id2,
        },
      },
    });

    if (!exists) {
      throw new ForbiddenException('user is not friend');
    }

    return this.prisma.item.findMany({
      where: {
        userId: friend.id,
      },
    });
  }
}
