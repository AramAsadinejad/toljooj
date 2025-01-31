import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as fs from 'fs';
import * as path from 'path';
import { log } from 'console';
import { CreateHistogramOptions } from 'perf_hooks';
import { CreateOpenRestDto, RestaurantCreationInterface, RestaurantUpdateInterface } from './restaurant.interface';
@Injectable()
export class RestaurantService {
    constructor(
        private databaseService:DatabaseService
    ) {}

    async getAllRestaurants(){
        return this.databaseService.query("select * from get_restaurant_details()");
    }


    async getRestaurantWithDetails(restaurantId: number) {
      // console.log(restaurantId);
      
        const query = 'SELECT * from get_restaurant_details_with_manager($1)';
        const result =await this.databaseService.query<any>(query, [restaurantId]);
        console.log(result[0]);
        
        return this.formatResponse(result);
      }
    
      private formatResponse(rawData: any[]) {
        const response = {
          id: rawData[0]?.restaurant_id || null,
          name: rawData[0]?.restaurant_name || null,
          photo: rawData[0]?.restaurant_photo,
          min_purchase: rawData[0]?.restaurant_min_purchase || null,
          delivery_radius: rawData[0]?.restaurant_delivery_radius || null,
          address:rawData[0]?.restaurant_address || null,
          managerId: rawData[0]?.manager_id || null,
          managerUsername: rawData[0]?.manager_username || null,
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

        // Function to get default image as base64
  private getDefaultImage(): string {
    const defaultImagePath = path.join(__dirname,'..', 'assets', 'KrustyKrabStock.png');
    const defaultImage = fs.readFileSync(defaultImagePath);
    return defaultImage.toString('base64');
  }

  async create(body:RestaurantCreationInterface){
    const query = `
    SELECT create_restaurant(
      $1, $2, $3, $4, $5, $6, $7, $8
    );
    `;

    const {
      name,
      min_purchase,
      deliveryRadius,
      managerId,
      locationX,
      locationY,
      address,
      imageUrl,
    } = body;

    await this.databaseService.query(query, [
      name,
      min_purchase,
      deliveryRadius,
      managerId,
      locationX,
      locationY,
      address,
      imageUrl
    ])
  }


  async upadateRestaurantDetails(body:RestaurantUpdateInterface){
      const query = `
      SELECT * from update_restaurant(
        $1, $2, $3, $4, $5, $6, $7, $8
      )`

      const {
        name = null, // Set to null if missing
        min_purchase = null, // Set to null if missing
        deliveryRadius = null, // Set to null if missing
        locationX = null, // Set to null if missing
        locationY = null, // Set to null if missing
        address = null, // Set to null if missing
        imageUrl = null, // Set to null if missing
        id
      } = body;

      log(name,min_purchase,deliveryRadius,locationX,locationY,address,imageUrl);

      return this.databaseService.query(query, [
        id,
        name,
        min_purchase,
        deliveryRadius,
        locationX,
        locationY,
        address,
        imageUrl
      ])
  }

  async addOpenRest(createOpenRestDto: CreateOpenRestDto) {
    const { restId, openHours } = createOpenRestDto;

    // Ensure time is in "HH:MM:SS" format
    const formattedOpenHours = openHours.map(entry => ({
      startHour: this.formatTime(entry.startHour),
      endHour: this.formatTime(entry.endHour),
      dayOfWeek: entry.dayOfWeek,
    }));

    const query = `SELECT add_open_rest($1, $2::JSONB)`;
    return this.databaseService.query(query, [restId, JSON.stringify(formattedOpenHours)]);
  }

  private formatTime(time: string): string {
    // Ensure time is in "HH:MM:SS" format
    if (!time.includes(":")) {
      // Convert numeric hour (e.g., "9" -> "09:00:00")
      return `${time.padStart(2, '0')}:00:00`;
    }
    return `${time}:00`; // Convert "9:30" to "09:30:00"
  }

  async getManagerRestaurants(managerId: number) {
    const query = `SELECT * FROM get_restaurants_by_manager($1)`;
    return this.databaseService.query(query, [managerId]);
  }


}
