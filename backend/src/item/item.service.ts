import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ItemCreationInterface } from './item.interface';

@Injectable()
export class ItemService {
    constructor(
        private readonly databaseService:DatabaseService
    ){}

    async create(itemData:ItemCreationInterface,categoryIds: number[],imageURL:string){
        const query = "select * from create_item_with_categories($1,$2,$3,$4)";
        return this.databaseService.query(query,[itemData.title,itemData.price,imageURL,categoryIds]);
    }

    async getItemsByCategory(id:number){
        const query = "select * from get_items_by_category($1)";
        return this.databaseService.query(query,[id]);
    }
}
