<h1 align="center">Wish List API</h1>

<p align="center">
    <img src="https://img.shields.io/badge/TypeScript-informational?style=flat&logo=typescript&logoColor=white" alt="TypeScript badge"/>
    <img src="https://img.shields.io/badge/NestJS-informational?style=flat&logo=nestjs&color=CB3837" alt="NestJS badge"/>
    <img src="https://img.shields.io/badge/PostgreSQL-informational?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL badge"/>
    <img src="https://img.shields.io/badge/Yarn-informational?style=flat&logo=Yarn&color=2C8EBB&logoColor=white" alt="Yarn badge"/>
    <img src="https://img.shields.io/badge/Jest-informational?style=flat&logo=Jest&color=2C8EBB&logoColor=white" alt="Jest badge"/>
    <img src="https://img.shields.io/badge/Docker-informational?style=flat&logo=docker&logoColor=white" alt="Docker badge"/>
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=Prisma&logoColor=white" alt="Prisma badge"/>
    <img src="https://img.shields.io/badge/PactumJS-ECD53F?style=flat&logo=PactumJS&logoColor=white" alt="PactumJS badge"/>
    <img src="https://img.shields.io/badge/Passport-informational?style=flat&logo=Passport&logoColor=white" alt="Passport badge"/>
</p>

This is a Wishlist API built using NestJS, designed to help users create and manage their personal wishlists. 

## Features

- **User Authentication:** Secure sign-up and sign-in using JWT.
- **Wishlist Management:** Users can add, edit, and delete items on their wishlist.
- **Social Connectivity:** Users can send friend requests, accept them, and become friends to view each other's wishlists. (This feature is still in development)

## Prerequisites
- Node.js
- TypeScript
- Yarn
- Docker

## Clone
Clone the repository. Create two files in the repo directory:

`.env`
```javascript
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5434/nest?schema=public"
JWT_SECRET="secret"
```

`.env.test`
```javascript
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5435/test?schema=public"
JWT_SECRET="secret"
```

## Run

Setup PostgreSQL using the following command:
```bash
yarn db:dev:restart
```
Run the app using:
```bash
# Run in development mode
yarn start

# Run in watch mode (development)
yarn start:dev
```

## Tests
```bash
# Run tests end to end
yarn test:e2e
```

## Contributing
If you have suggestions for improvements or bug fixes, please feel free to fork the repository and submit a pull request.