import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserInterface } from './user.interface';
import { TokenService } from 'src/token/token.service';
import { Reflector } from '@nestjs/core';
import { TOKEN_SERVICE } from './user.constancts';


export const GetUser = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext): Promise<UserInterface | null> => {
        const request = ctx.switchToHttp().getRequest<Request>();
        return request['user'];
        // const authHeader = request.headers.authorization;

        // if (!authHeader) {
        //     return null; // No token provided
        // }

        // const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
        // if (!token) {
        //     return null; // Invalid token format
        // }

        // // Retrieve the AuthService instance using the Reflector
        // const reflector = new Reflector();
        // const tokenService = reflector.get<TokenService>(TOKEN_SERVICE, ctx.getHandler());

        // if (!tokenService) {
        //     throw new Error('TokenService not found');
        // }

        // // Fetch the user from the database using the token
        // const user = await tokenService.validateToken(token);
        // if (!user)
        //     throw new UnauthorizedException('User not found');
        // return user;
    },
);