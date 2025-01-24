import { SetMetadata } from '@nestjs/common';
import { UserType } from './user.interface';

export const TOKEN_SERVICE = 'TOKEN_SERVICE';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
