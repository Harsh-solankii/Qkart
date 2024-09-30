import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {

  private resetTokens = new Map<string, string>(); 
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private  mailerService: MailerService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string,userid:number }> {
    const user = await this.usersService.findOne(email);
    const hash_password = await bcrypt.compare(pass,user.password);

    if (!hash_password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };

    return {
      access_token:await this.jwtService.signAsync(payload),
      userid:payload.sub
    };
  }

  async forgotPassword(email:string):Promise<{msg:string}>{
     const user = await this.usersService.findOne(email);

     if(!user){
        throw new NotFoundException('Email address not found');
     }
     const resetToken = uuidv4(); 
     this.resetTokens.set(resetToken,email);

     // Send the reset email
     await this.mailerService.sendMail({
         to: email,
         subject: 'Password Reset Request',
         template: 'reset-password', // Name of the template file (without extension)
         context: {
             name: email, // You can add other user info if needed
             resetLink: `http://your-app.com/reset-password?token=${resetToken}`, // Link to your reset page
         },
     });

     return {
      msg:'completed'
     }
  }

  async updatePassword(token:string,newpassword:string):Promise<void>{
    const email = this.resetTokens.get(token);
    if (!email) {
        throw new BadRequestException('Invalid or expired token.');
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    const user = await this.usersService.findOne(email);

    user.password = hashedPassword;

    await this.usersService.save(user);
    
    this.resetTokens.delete(token);
  }

}