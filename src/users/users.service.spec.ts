import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUser = {
    email: 'test@example.com',
    password: 'password',
    name: 'Test User',
    save: jest.fn().mockResolvedValue({
      email: 'test@example.com',
      password: 'hashedPassword',
      name: 'Test User',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            new: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should create a new user', async () => {
    const createUserDto = { email: 'test@example.com', password: 'password', name: 'Test User' };
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
    jest.spyOn(model, 'create').mockResolvedValue(mockUser as any);
    
    const result = await service.create(createUserDto);
    expect(result).toEqual(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
    expect(model.create).toHaveBeenCalledWith({ ...createUserDto, password: 'hashedPassword' });
  });

  it('should find a user by email', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValue(mockUser as any);
    
    const result = await service.findByEmail('test@example.com');
    expect(result).toEqual(mockUser);
    expect(model.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
  });

  it('should find a user by id', async () => {
    jest.spyOn(model, 'findById').mockResolvedValue(mockUser as any);
    
    const result = await service.findById('1');
    expect(result).toEqual(mockUser);
    expect(model.findById).toHaveBeenCalledWith('1');
  });

  it('should update a user profile', async () => {
    const updateUserDto = { name: 'Updated Name', horoscope: 'Leo', zodiac: 'Dragon' };
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue({ ...mockUser, ...updateUserDto } as any);

    const result = await service.updateProfile('1', updateUserDto);
    expect(result).toEqual({ ...mockUser, ...updateUserDto });
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updateUserDto, { new: true });
  });

  it('should delete a user profile', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockUser as any);

    const result = await service.deleteProfile('1');
    expect(result).toEqual(mockUser);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
  });
});
