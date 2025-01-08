import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request) {
    console.log('mukunda');
    return this.authService.login(req.user);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard)
  protectedRoute(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.authService.login(user);
  }
}
