import { Injectable } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';
import { DatabaseService } from 'src/database/database.service';
import { UserInterface } from 'src/user/user.interface';

@Injectable()
export class CartService {
    constructor(
        private readonly addressService:AddressService,
        private readonly dataBaseService:DatabaseService
    ){}


    async getCart(user:UserInterface) {
        const query = "select * from get_active_cart_details($1)";
        const address = await this.addressService.getDefaultAddress(user);
        const result = await this.dataBaseService.query(query,[address.address_id]);
        return this.formatCartDetails(result);

    }

    private formatCartDetails(rows: any[]) {
        const itemsMap = new Map<number, any>();
      
        for (const row of rows) {
          const itemId = row.item_id;
      
          // If the item is not already in the map, add it
          if (!itemsMap.has(itemId)) {
            itemsMap.set(itemId, {
              id: row.item_id,
              title: row.item_title,
              price: row.item_price,
              photoUrl: row.item_photo,
              categories: [],
              restaurant: {
                id: row.restaurant_id,
                name: row.restaurant_name,
                imageUrl: row.restaurant_image_url,
                manager: {
                  id: row.manager_id,
                  username: row.manager_name,
                },
              },
            });
          }
      
          // Add the category to the item
          const item = itemsMap.get(itemId);
          item.categories.push({
            id: row.category_id,
            name: row.category_name,
          });
        }
      
        // Convert the map to an array of items
        const items = Array.from(itemsMap.values());
      
        return { cartId : rows[0].cart_id ,items:items};
    }

    private async createCart(user:UserInterface) {
        const query = "select create_cart($1)";
        const address = await this.addressService.getDefaultAddress(user);
        const result = await this.dataBaseService.query(query,[user.id]);
    }


    async addToCart(user:UserInterface,itemId:number,quantity:number) {
        const address = await this.addressService.getDefaultAddress(user);
        const cart = await this.getCart(user);
        const query = "select add_item_to_cart($1,$2,$3)";
        return this.dataBaseService.query(query,[cart.cartId,itemId,quantity]);
    }
}
