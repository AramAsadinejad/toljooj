import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from './token.service';


@Injectable()
export class TokenAuthGuard {

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

        // Attach the user to the request object
        request.user = user;

        return true; // Allow access to the route
    }
}