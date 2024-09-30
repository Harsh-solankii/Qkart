import { Inject, Injectable } from '@nestjs/common';
import { user } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_REPOSITORY') private userrepository:typeof user){}

  async registeruser(userdata:any):Promise<user>{
     const password = userdata.password;
     const hash = await bcrypt.hash(password,10);
     userdata.password = hash;

     const newuser = await this.userrepository.create(userdata);
     return newuser;
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

  save(userdata:any):Promise<user[]>{
    return this.save(userdata);
  }
}