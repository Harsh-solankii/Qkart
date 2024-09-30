import { Body, Controller, HttpStatus, Post,Response } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Public } from "src/common/decorators/public.decorators";

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