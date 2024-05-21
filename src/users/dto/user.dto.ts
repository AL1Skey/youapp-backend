import { IsEmail, isIdentityCard, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  horoscope?: string;

  @IsOptional()
  @IsString()
  zodiac?: string;
}
