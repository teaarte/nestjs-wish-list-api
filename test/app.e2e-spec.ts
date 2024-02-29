import {Test} from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDTO, UserFriendDto } from 'src/user/dto';
import { CreateItemDto, EditItemDto, FriendItemsDto } from 'src/item/dto';

describe('App e2e',() => {
  let app :INestApplication;
  let prisma: PrismaService;

  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  })

  afterAll(() => {
    app.close();
  });
  

  describe('Auth',()=>{
    const dto: AuthDto = {
      email: '111@gmail.com',
      password: '123',
    };
    describe('Signup',()=>{
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });
      it('Should Signup',()=>{
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
      });

    });

    describe('Signin',()=>{
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      });
      it('Should signin',()=>{
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200).stores('userAt','access_token');
      });

    });
  });

  describe('User',()=>{
    describe('Get User',()=>{
      it('Get user',()=>{
        return pactum.spec().get('/users/me').withBearerToken('$S{userAt}').expectStatus(200);
      });

    });

    describe('Edit User',()=>{
      it('Should Edit User',()=>{
        const edituserdto:EditUserDTO={
          email:'eee@gmail.com',
          fristName:"ru",
          LastName:"den"
        }
        return pactum.spec().patch('/users').withBearerToken('$S{userAt}').withBody(edituserdto).expectStatus(200);
      });
    });
  });

  describe('Friendship',()=>{
    describe('Get No Friends',()=>{
      it('Should get an empty list',()=>{
        return pactum.spec().get('/users/friends').withBearerToken('$S{userAt}').expectStatus(200).expectBody([]);
      });
    });


    describe('Add Friend',()=>{
      it('Friend signup',()=>{
        const dto:AuthDto = {
          email: '222@gmail.com',
          password: '123',
        }
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201).stores('friendAT','access_token');
      });
      it('Should add friendship',()=>{
        const frienddto:UserFriendDto = {
          email: '222@gmail.com'
        }
        return pactum.spec().post('/users/befriend').withBearerToken('$S{userAt}').withBody(frienddto).expectStatus(201);
      });
    });

    describe('Get Friends',()=>{
      it('Should get friend list',()=>{
        return pactum.spec().get('/users/friends').withBearerToken('$S{userAt}').expectStatus(200).expectJsonLength(1);
      });
    });

    describe('Remove friend',()=>{
      it('Should Breakup',()=>{
        const frienddto:UserFriendDto = {
          email: '222@gmail.com'
        }
        return pactum.spec().delete('/users/breakup').withBearerToken('$S{userAt}').withBody(frienddto).expectStatus(204);
      });
    });

    describe('Remove not a friend',()=>{
      it('Cannot Breakup',()=>{
        const frienddto:UserFriendDto = {
          email: '222@gmail.com'
        }
        return pactum.spec().delete('/users/breakup').withBearerToken('$S{userAt}').withBody(frienddto).expectStatus(403);
      });
    });

    describe('Get No Friends',()=>{
      it('Should get an empty list',()=>{
        return pactum.spec().get('/users/friends').withBearerToken('$S{userAt}').expectStatus(200).expectBody([]);
      });
    });
  });

  
  describe('Items',()=>{
    describe('Get empty item list',()=>{
      it('Should get empty list',()=>{
        return pactum.spec().get('/items').withBearerToken('$S{userAt}').expectStatus(200).expectBody([]);
      });
    });

    describe('Create Item',()=>{
      it('Creates item',()=>{
        const createitemdto: CreateItemDto = {
          title:"item1",
          link:"xyz"
        }
        return pactum.spec().post('/items').withBearerToken('$S{userAt}').withBody(createitemdto).expectStatus(201).stores('itemId','id');
      });
    });

    describe('Get item list',()=>{
      it('Should get item list',()=>{
        return pactum.spec().get('/items').withBearerToken('$S{userAt}').expectStatus(200).expectJsonLength(1);
      });
    });


    describe('Edit item by id',()=>{
      it('Edit Item by id',()=>{
        const edititemdto:EditItemDto={
          quantity:2
        }
        return pactum.spec().patch('/items/{id}').withPathParams('id','$S{itemId}').withBearerToken('$S{userAt}').withBody(edititemdto).expectStatus(200);

      });
    });

    describe('Get item by ID',()=>{
      it('Get item by id',()=>{
        return pactum.spec().get('/items/{id}').withPathParams('id','$S{itemId}').withBearerToken('$S{userAt}').expectStatus(200);
      });
    });

    describe('Delete item by id',()=>{
      it('delete item by id',()=>{
        return pactum.spec().delete('/items/{id}').withPathParams('id','$S{itemId}').withBearerToken('$S{userAt}').expectStatus(204);
      });
    });

    describe('Get empty item list',()=>{
      it('Should get empty list',()=>{
        return pactum.spec().get('/items').withBearerToken('$S{userAt}').expectStatus(200).expectBody([]);
      });
    });


  });


  describe("Friend's Items",()=>{
    describe('Get items of not friend',()=>{
      it('should get forbidden error',()=>{
        const friendsItemdto:FriendItemsDto = {
          email:"222@gmail.com"
        }
        return pactum.spec().get('/items/friend').withBearerToken('$S{userAt}').withBody(friendsItemdto).expectStatus(403);
      });
    });

    describe('Get items of a friend',()=>{
      describe('Add friend',()=>{
        it('Should add friendship',()=>{
          const frienddto:UserFriendDto = {
            email: '222@gmail.com'
          }
          return pactum.spec().post('/users/befriend').withBearerToken('$S{userAt}').withBody(frienddto).expectStatus(201);
        });
      });

      describe("Get Items of the friend",()=>{
        it('Should get an empty list',()=>{
          const friendsItemdto:FriendItemsDto = {
            email:"222@gmail.com"
          }
          return pactum.spec().get('/items/friend').withBearerToken('$S{userAt}').withBody(friendsItemdto).expectStatus(200).expectBody([]);
        });
      });

      describe('Create Item for friend',()=>{
        it('Creates item for friend',()=>{
          const createitemdto: CreateItemDto = {
            title:"item2",
            link:"xyz"
          }
          return pactum.spec().post('/items').withBearerToken('$S{friendAT}').withBody(createitemdto).expectStatus(201);
        });
      });

      describe("Get Items of the friend",()=>{
        it('Should get an item list',()=>{
          const friendsItemdto:FriendItemsDto = {
            email:"222@gmail.com"
          }
          return pactum.spec().get('/items/friend').withBearerToken('$S{userAt}').withBody(friendsItemdto).expectStatus(200).expectJsonLength(1);
        });
      });

    });
  });

});