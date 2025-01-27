import { Injectable, ExecutionContext, UnauthorizedException, CanActivate, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from './token.service';
import { UserType } from 'src/user/user.interface';
import { ROLES_KEY } from 'src/user/user.constancts';


@Injectable()
export class TokenAuthGuard {
    private logger:Logger = new Logger();
    constructor(
        private tokenService: TokenService
    ){}


    async canActivate(context: ExecutionContext): Promise<boolean> {

        // Extract the token from the request header
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;


        if (!authHeader) {
            throw new UnauthorizedException('No token provided');
        }

        const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
        if (!token) {
            throw new UnauthorizedException('Invalid token format');
        }
        // console.log(token);
        
        // Fetch the user from the database using the token
        const user = await this.tokenService.validateToken(token);
        if (!user) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        // console.log(user);
        // Attach the user to the request object
        request.user = user;
        // console.log(request.user);
        // this.logger.debug("request.user = ",request.user);
        
        return true; // Allow access to the route
    }
}


