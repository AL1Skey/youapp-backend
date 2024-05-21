import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './schemas/chat-message.schema';
import { CreateChatMessageDto, UpdateChatMessageDto } from './dto/create-chat-message.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessageDocument>) {}

  async sendMessage(createChatMessageDto: CreateChatMessageDto): Promise<ChatMessage> {
    const message = new this.chatMessageModel(createChatMessageDto);
    return message.save();
  }

  async getMessages(userId: string): Promise<ChatMessage[]> {
    return this.chatMessageModel.find({ $or: [{ senderId: userId }, { receiverId: userId }] }).exec();
  }

  async updateMessage(id: string, updateChatMessageDto: UpdateChatMessageDto): Promise<ChatMessage> {
    return this.chatMessageModel.findByIdAndUpdate(id, updateChatMessageDto, { new: true }).exec();
  }

  async deleteMessage(id: string): Promise<ChatMessage> {
    return this.chatMessageModel.findByIdAndDelete(id).exec();
  }
}
