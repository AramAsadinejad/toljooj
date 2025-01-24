import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from './token.service';
import { UserType } from 'src/user/user.interface';
import { ROLES_KEY } from 'src/user/user.constancts';


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


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserType[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      // If no roles are defined, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // The user should already be attached by a preceding authentication guard

    // Check if the user's type matches one of the required roles
    return requiredRoles.includes(user.type);
  }
}
