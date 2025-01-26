import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { log } from "console";
import { ROLES_KEY } from "src/user/user.constancts";
import { UserType } from "src/user/user.interface";

@Injectable()
export class RolesGuard implements CanActivate {
  private logger:Logger = new Logger();
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
    // log(user.type + " " + requiredRoles);
    return requiredRoles.includes(user.type);
  }
}