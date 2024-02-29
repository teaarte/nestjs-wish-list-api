import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDTO, UserFriendDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async editUser(userId:number,dto:EditUserDTO){
        const user = await this.prisma.user.update({
            where:{
                id:userId
            },
            data:{
                ...dto
            }
        })

        delete user.hash;

        return user;
    }

    async befriendUser(userId:number,dto:UserFriendDto){
        const friend = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            }
        })
        if(!friend){
            throw new ForbiddenException(
                "user's email is not registered",
            );
        }
        let friendId:number = friend.id;
        if (userId > friendId) {
            [userId, friendId] = [friendId, userId];
        }
        const exists = await this.prisma.friendship.findUnique({
            where: {
                userId_friendId: {
                    userId: userId,
                    friendId: friendId,
                },
            },
        });
        if(exists){
            throw new ForbiddenException(
                "already friends",
            );
        }
        const friendship = await this.prisma.friendship.create({
            data:{
                userId:userId,
                friendId:friendId
            }
        })

        return friendship;
    }

    async removeFriendUser(userId:number,dto:UserFriendDto){
        const friend = await this.prisma.user.findUnique({
            where:{
                email:dto.email,
            }
        })
        if(!friend){
            throw new ForbiddenException(
                "friend's email is not registered",
            );
        }
        let friendId:number = friend.id;
        if (userId > friendId) {
            [userId, friendId] = [friendId, userId];
        }
        const exists = await this.prisma.friendship.findUnique({
            where: {
                userId_friendId: {
                    userId: userId,
                    friendId: friendId,
                },
            },
        });

        if(!exists){
            throw new ForbiddenException(
                "user is not friend",
            );
        }

        await this.prisma.friendship.delete({
            where:{
                userId_friendId: {
                    userId: userId,
                    friendId: friendId,
                },
            }
        })
    }

    async getFriends(userId:number){
        const query = await this.prisma.friendship.findMany({
            where:{
                OR:[
                    {userId: userId},
                    {friendId:userId}
                ]
            },
            include:{
                user:{
                    select:{email:true,id:true}
                },
                friend: {
                    select: { email: true,id:true },
                }
            }
        })
        
        const friends = [];

        Object.values(query).map(element =>{
            if(element.user.id !== userId ){
                friends.push(element.user.email);
            }
            if(element.friend.id !== userId ){
                friends.push(element.friend.email);
            }
        });

        return friends;
    }
}
