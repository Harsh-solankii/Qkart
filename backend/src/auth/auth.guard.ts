import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import { Request } from 'express';
import { Reflector } from '@nestjs/core';


@Injectable()

export class Authguard implements CanActivate{
  constructor(private jwtservice:JwtService,private readonly reflector: Reflector){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
        return true; // Allow access if the route is marked as public
    }

      const request = context.switchToHttp().getRequest();

      const token = this.extractTokenFromHeader(request);

      if(!token){
        throw new UnauthorizedException();
      }

      try {
        const payload = await this.jwtservice.verifyAsync(
            token,
            {
                secret:jwtConstants.secret
            }
        )

        request['user'] = payload;
      } catch {
         throw new UnauthorizedException();
      }

      return true;
  }

  private extractTokenFromHeader(request:Request):string | undefined{
    const [type, token] = request.headers.authorization?.split(' ')??[];

    return type === 'Bearer' ? token : undefined;
  }

}
