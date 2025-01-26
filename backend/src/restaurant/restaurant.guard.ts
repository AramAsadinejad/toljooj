import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RestaurantService } from './restaurant.service';
import { UserInterface } from 'src/user/user.interface';


@Injectable()
export class RestaurantManagerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private restaurantsService: RestaurantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: UserInterface = request.user; // Authenticated user
    const restaurantId = +request.params.id; // Extract restaurant ID from route parameters

    // Fetch the restaurant
    const restaurant = await this.restaurantsService.getRestaurantWithDetails(restaurantId);

    // Check if the authenticated user is the manager of the restaurant
    if (restaurant.managerId !== user.id) {
      throw new ForbiddenException('You do not have permission to update this restaurant');
    }

    return true;
  }
}