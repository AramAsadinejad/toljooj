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

    async update(id:number,itemData:ItemCreationInterface,imageURl:string,categoryIds: number[]){
        const query = "select * from update_item($1,$2,$3,$4,$5)";
        return this.databaseService.query(query,[id,itemData.price,itemData.title,imageURl,categoryIds]);
    }

    async deleteItem(id:number){
        const query = "select * from delete_item($1)";
        return this.databaseService.query(query,[id]);
    }
}
