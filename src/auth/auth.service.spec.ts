import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    const registerDto: RegisterDto = { email: 'test@test.com', password: 'password', name: 'Test' };
    jest.spyOn(service['usersService'], 'create').mockResolvedValue(registerDto as any);

    expect(await service.register(registerDto)).toEqual({ access_token: 'token' });
  });

  it('should login a user', async () => {
    const loginDto: LoginDto = { email: 'test@test.com', password: 'password' };
    jest.spyOn(service['usersService'], 'findByEmail').mockResolvedValue({ password: 'hashedPassword' } as any);
    jest.spyOn(service, 'validatePassword').mockResolvedValue(true);

    expect(await service.login(loginDto)).toEqual({ access_token: 'token' });
  });
});
