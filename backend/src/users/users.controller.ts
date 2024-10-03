import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
// import { Public } from "src/decorators/public.decorators";
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
  


@Controller('user')
    
export class  UserController {

    constructor(private userservice:UsersService){}

    @Public()
    @Post('register')
    async signin(@Body() userdata:any){
        return this.userservice.registeruser(userdata);
    }

}