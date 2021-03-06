import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Body() _loginDto: LoginDto, @Req() req) {
    return this.authService.createUserToken(req.user.id);
  }

  @Get('verify/:email/:token')
  verify(@Param('email') email: string, @Param('token') token: string) {
    return this.authService.verify(email, token);
  }
}
