import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Response,
    Put,
    Request,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }  

    @Get('user')
    getProfile(@Request() req) { 
      return req.user;
    }

    @Public()
    @Post('forgot-password')
    forgotPassword(@Body() forgotPasswordDto: Record<string, any>) {
      return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Public()
    @Patch('reset-password')
    updatePassword(@Body() updatePasswordDto: Record<string, any>) {
      return this.authService.updatePassword(updatePasswordDto.token ,updatePasswordDto.password);
    }
  }

