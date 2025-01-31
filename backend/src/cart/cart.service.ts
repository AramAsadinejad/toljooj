import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { AddressService } from 'src/address/address.service';
import { DatabaseService } from 'src/database/database.service';
import { UserInterface } from 'src/user/user.interface';

@Injectable()
export class CartService {
    constructor(
        private readonly addressService:AddressService,
        private readonly dataBaseService:DatabaseService
    ){}


    async getCarts(user:UserInterface) {
        const query = "select * from get_active_cart_details($1)";
        const address = await this.addressService.getDefaultAddress(user);
        const result = await this.dataBaseService.query(query,[address.address_id]);
        return this.formatCartDetails(result);

    }


    private formatCartDetails(rows: any[]) {
      const cartMap = new Map<number, any>();
  
      for (const row of rows) {
          const cartId = row.cart_id;
          const restaurantId = row.restaurant_id;
          const itemId = row.item_id;
  
          // If the cart is not already in the map, add it
          if (!cartMap.has(cartId)) {
              cartMap.set(cartId, {
                  cartId: cartId,
                  isActive: row.is_active,
                  address:{
                    addressId : row.address_id,
                    addressValue : row.address_value,

                  },
                  restaurant: {
                      id: restaurantId,
                      name: row.restaurant_name,
                      imageUrl: row.restaurant_image_url,
                      manager: {
                          id: row.manager_id,
                          username: row.manager_name,
                      },
                      items: [],
                  }
              });
          }
  
          // Get the cart object
          const cart = cartMap.get(cartId);
          const restaurant = cart.restaurant;
  
          // Check if the item already exists in the restaurant's items array
          let item = restaurant.items.find((i: any) => i.id === itemId);
  
          if (!item) {
              // If the item is not in the list, add it
              item = {
                  id: itemId,
                  title: row.item_title,
                  price: row.item_price,
                  photoUrl: row.item_photo,
                  quantity: row.quantity,
                  categories: [],
              };
              restaurant.items.push(item);
          }
  
          // Add category to the item if it doesn't already exist
          if (!item.categories.some((c: any) => c.id === row.category_id)) {
              item.categories.push({
                  id: row.category_id,
                  name: row.category_name,
              });
          }
      }
  
      // Convert the map to an array of carts
      return Array.from(cartMap.values());
  }
  
  

    private async createCart(user:UserInterface) {
        const query = "select create_cart($1)";
        const address = await this.addressService.getDefaultAddress(user);
        const result = await this.dataBaseService.query(query,[user.id]);
    }


    async addToCart(user:UserInterface,itemId:number,quantity:number) {
        const address = await this.addressService.getDefaultAddress(user);
        // log(address);
        // const cart = await this.getCart(user);
        const query = "select add_item_to_cart($1,$2,$3)";
        return this.dataBaseService.query(query,[address.address_id,itemId,quantity]);
    }

    async decreaseQuantity(itemId:number,cartId:number){
        const query = "select decrease_item_quantity($1,$2)";
        return this.dataBaseService.query(query,[itemId,cartId]); 
    }
}
