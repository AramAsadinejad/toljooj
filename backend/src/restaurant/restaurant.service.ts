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


    async getRestaurantWithDetails(restaurantId: number) {
      // console.log(restaurantId);
      
        const query = 'SELECT * from get_restaurant_with_categories_and_items($1)';
        const result =await this.databaseService.query<any>(query, [restaurantId]);
        // console.log(result[0]);
        
        return this.formatResponse(result);
      }
    
      private formatResponse(rawData: any[]) {
        const response = {
          id: rawData[0]?.restaurant_id || null,
          name: rawData[0]?.restaurant_name || null,
          photo: rawData[0]?.restaurant_photo || null,
          min_purchase: rawData[0]?.restaurant_min_purchase || null,
          delivery_radius: rawData[0]?.restaurant_delivery_radius || null,
          address:rawData[0]?.restaurant_address || null,
          categories: [],
        };
    
        const categoryMap = new Map();
        rawData.forEach((row) => {
          if (!categoryMap.has(row.category_id)) {
            categoryMap.set(row.category_id, {
              id: row.category_id,
              name: row.category_name,
              items: [],
            });
          }
    
          if (row.item_id) {
            categoryMap.get(row.category_id).items.push({
              id: row.dish_id,
              title: row.item_title,
              price: row.item_price,
              photo: row.item_photo,
            });
          }
          // console.log(categoryMap);
          
        });
    
        response.categories = Array.from(categoryMap.values());
        return response;
      }


}
