import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { ChatService } from './chat/chat.service';
import { CreateUserDto } from './users/dto/user.dto';
import { CreateChatMessageDto } from './chat/dto/create-chat-message.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const chatService = app.get(ChatService);

  const user1: CreateUserDto = {
    email: 'user1@example.com',
    password: 'password123',
    name: 'User One',
  };

  const user2: CreateUserDto = {
    email: 'user2@example.com',
    password: 'password123',
    name: 'User Two',
  };

  const createdUser1 = await usersService.create(user1);
  const createdUser2 = await usersService.create(user2);

 
  const message1: CreateChatMessageDto = {
    senderId: createdUser1._id.toString(),
    receiverId: createdUser2._id.toString(),
    message: 'Hello, User Two!',
  };

  const message2: CreateChatMessageDto = {
    senderId: createdUser2._id.toString(),
    receiverId: createdUser1._id.toString(),
    message: 'Hello, User One!',
  };

  await chatService.sendMessage(message1);
  await chatService.sendMessage(message2);

  await app.close();
}

bootstrap();
