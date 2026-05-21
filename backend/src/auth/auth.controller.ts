import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.auth.login(body.email, body.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Request() req) {
    // JwtStrategy returns { userId, role }
    return { id: req.user?.userId || null, role: req.user?.role || null };
  }
}

