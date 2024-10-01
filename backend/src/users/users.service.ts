import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { user } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPOSITORY') private userrepository:typeof user){}

  async registeruser(userdata:any):Promise<{user:user,statusCode:number}>{
     const password = userdata.password;
     const hash = await bcrypt.hash(password,10);
     userdata.password = hash;

     const email_already = await this.userrepository.findOne(userdata.email);
     if(email_already){
      throw new Error('Email already exists');
      }

     const newuser = await this.userrepository.create(userdata);
     return{
      user:newuser,
      statusCode:HttpStatus.OK
     }
  }

  findOne(email: string): Promise<user> {
    return this.userrepository.findOne({
      where: {
        email,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  findAll(): Promise<user[]> {
    return this.userrepository.findAll<user>();
  }

  async savedata(userdata:any):Promise<user>{
    return userdata.save();
  }
}