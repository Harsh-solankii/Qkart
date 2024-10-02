import { Body, Controller, HttpStatus, Post,Response } from "@nestjs/common";
import { UsersService } from "./users.service";
// import { Public } from "src/decorators/public.decorators";
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
  


@Controller('user')
    
export class  UserController {

    constructor(private userservice:UsersService){}

    @Public()
    @Post('register')
    async signin(@Body() userdata:any, @Response() res){
        const result = await this.userservice.registeruser(userdata);
        res.status(HttpStatus.OK).json(result);
    }

}