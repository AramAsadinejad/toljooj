import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RestaurantService {
    constructor(
        private databaseService:DatabaseService
    ) {}

    async getAllRestaurants(){
        return this.databaseService.query("select * from get_all_restaurants_with_manager()");
    }


    async getRestaurantById(id:number){
        
    }


}
