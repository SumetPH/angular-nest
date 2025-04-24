import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import express from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    const res = this.authService.register(body);
    return res;
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    const res = this.authService.login(body);
    return res;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req: express.Request) {
    const user = req.user;
    return user;
  }
}
