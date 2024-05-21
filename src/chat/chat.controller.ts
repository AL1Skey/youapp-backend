import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatMessageDto, UpdateChatMessageDto } from './dto/create-chat-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async sendMessage(@Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatService.sendMessage(createChatMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages/:userId')
  async getMessages(@Param('userId') userId: string) {
    return this.chatService.getMessages(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('messages/:id')
  async updateMessage(@Param('id') id: string, @Body() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatService.updateMessage(id, updateChatMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('messages/:id')
  async deleteMessage(@Param('id') id: string) {
    return this.chatService.deleteMessage(id);
  }
}

