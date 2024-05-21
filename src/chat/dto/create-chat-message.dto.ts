import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
export class UpdateChatMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
