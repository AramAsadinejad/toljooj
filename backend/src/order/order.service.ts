import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserInterface } from 'src/user/user.interface';
import { OrderWithItemsDto } from './order.dto';
import { log } from 'console';

@Injectable()
export class OrderService {
    constructor(
        private readonly databaseService:DatabaseService
    ){}

    async getOrders(user:UserInterface) {
        const query = "select * from get_orders_by_user($1)";
        const rawData = await this.databaseService.query(query,[user.id]);
        return this.formatOrdersByUser(rawData);    
    }


    private formatOrdersByUser(rows: any[]) {
        const cartsMap = new Map<number, any>();
    
        for (const row of rows) {
            const cartId = row.cart_id;
    
            // If the cart is not already in the map, create the cart object
            if (!cartsMap.has(cartId)) {
                cartsMap.set(cartId, {
                    cartId: row.cart_id,
                    deliveryFee: row.delivery_fee,
                    ispurchased: row.ispurchased,
                    status: row.status,
                    isActive: row.cart_isactive,
                    addressId: row.address_id,
                    restaurant: {
                        id: row.restaurant_id,
                        name: row.restaurant_name,
                        imageUrl: row.restaurant_image_url,
                        managerId: row.restaurant_manager_id,
                    },
                    items: [],
                });
            }
    
            // Get the cart object from the map
            const cart = cartsMap.get(cartId);
    
            // Add the item to the cart
            cart.items.push({
                itemId: row.item_id,
                itemTitle: row.item_title,
                itemPrice: row.item_price,
                itemPhotoUrl: row.item_photo_url,
                categoryId: row.category_id,
                categoryName: row.category_name,
                quantity:row.item_quantity
            });
        }
    
        // Convert the map to an array of carts
        return Array.from(cartsMap.values());
    }
    
    async createOrder(cartId:number,deliveryFee:number,isPurchased:boolean) {
        const query = "select * from create_order($1,$2,$3)";
        return this.databaseService.query(query,[cartId,deliveryFee,isPurchased]);
    }

    async getManagerPendingOrders(managerId:number){
        const rawData = await this.databaseService.query<any>(
            'SELECT * FROM get_orders_by_manager($1)', 
            [managerId]
          );
        //   log(rawData);
        return this.formatOrdersByRestaurant(rawData);

    }
    private formatOrdersByRestaurant(rows: any[]) {
        const cartsMap = new Map<number, any>();
    
        for (const row of rows) {
            const cartId = row.cart_id;
    
            // If the cart is not already in the map, create the cart object
            if (!cartsMap.has(cartId)) {
                cartsMap.set(cartId, {
                    cartId: row.cart_id,
                    deliveryFee: row.delivery_fee,
                    ispurchased: row.ispurchased,
                    status: row.status,
                    restaurant: {
                        id: row.restaurant_id,
                        name: row.restaurant_name,
                        imageUrl: row.restaurant_image_url,
                        managerId: row.restaurant_manager_id,
                    },
                    items: [],
                });
            }
    
            // Get the cart object from the map
            const cart = cartsMap.get(cartId);
    
            // Add the item to the cart
            cart.items.push({
                itemId: row.item_id,
                itemTitle: row.item_title,
                itemPrice: row.item_price,
                itemPhotoUrl: row.item_photo_url,
                categoryId: row.category_id,
                categoryName: row.category_name,
                item_quantity : row.item_quantity
            });
        }
    
        // Convert the map to an array of carts
        return Array.from(cartsMap.values());
    }
    
    

    async deletePendingOrder(orderId:number) {
        const query = "select * from delete_pending_order($1)";
        const result = await this.databaseService.query<any>(query,[orderId]);
        // log(result);
        const deletePendingOrder = result[0].delete_pending_order;
        if (deletePendingOrder) {
            return result;
        }
        throw new HttpException("bad request",400);
    }

    async setOrderStatus(orderId:number,deliveryFee:number) {
        const query = "select * from set_delivery_fee_and_mark_status($1,$2)";
        return this.databaseService.query(query,[orderId,deliveryFee]);
    }
}
