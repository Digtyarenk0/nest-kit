import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { Response } from 'express';

import { UserService } from '../../../../shared/infrastructure/user/services/user.service';

import { LoginDto } from '../../../../shared/infrastructure/user/dto/login.dto';
import { RegisterDto } from '../../../../shared/infrastructure/user/dto/register.dto';
import { AuthService } from './auth.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    register: jest.fn(),
    validateUser: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'jwt.secret':
          return 'test-secret';
        case 'jwt.accessExpires':
          return '15m';
        case 'jwt.refreshExpires':
          return '7d';
        default:
          return null;
      }
    }),
  };

  const mockResponse = {
    cookie: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        email: registerDto.email,
      };

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      mockUserService.register.mockResolvedValue(mockUser);
      mockUserService.validateUser.mockResolvedValue(mockUser);
      mockJwtService.signAsync
        .mockResolvedValueOnce(mockTokens.accessToken)
        .mockResolvedValueOnce(mockTokens.refreshToken);

      const result = await service.register(registerDto, mockResponse);

      expect(result).toEqual({
        accessToken: mockTokens.accessToken,
      });
      expect(mockUserService.register).toHaveBeenCalledWith(registerDto);
      expect(mockUserService.validateUser).toHaveBeenCalledWith(registerDto);
      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refreshToken',
        mockTokens.refreshToken,
        expect.any(Object),
      );
    });
  });

  describe('login', () => {
    it('should login user and return tokens', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        email: loginDto.email,
      };

      const mockTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };

      mockUserService.validateUser.mockResolvedValue(mockUser);
      mockJwtService.signAsync
        .mockResolvedValueOnce(mockTokens.accessToken)
        .mockResolvedValueOnce(mockTokens.refreshToken);

      const result = await service.login(loginDto, mockResponse);

      expect(result).toEqual({
        accessToken: mockTokens.accessToken,
      });
      expect(mockUserService.validateUser).toHaveBeenCalledWith(loginDto);
      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refreshToken',
        mockTokens.refreshToken,
        expect.any(Object),
      );
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      mockUserService.validateUser.mockRejectedValue(
        new UnauthorizedException('Invalid credentials'),
      );

      await expect(service.login(loginDto, mockResponse)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockResponse.cookie).not.toHaveBeenCalled();
    });
  });
});
