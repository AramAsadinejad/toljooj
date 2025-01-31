import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoryService {

    constructor(
        private readonly databaseService:DatabaseService
    ){}

    async getCategoriesByRestaurantId(id:number){
        const query = "select * from get_categories_by_restaurant($1)";
        return this.databaseService.query(query,[id]);
    }

    async createCategory(name:string,restaurantId:number){
        const query = "select * from create_category($1,$2)";
        return this.databaseService.query(query,[name,restaurantId]);
    
    }

    async updateCategory(id:number,name:string){
        const query = "select * from update_category($1,$2)";
        return this.databaseService.query(query,[id,name]);
    }

    async deleteCategory(id:number){
        const query = "select * from delete_category($1)";
        return this.databaseService.query(query,[id]);
    }
}
