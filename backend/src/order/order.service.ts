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
        return this.databaseService.query(query,[user.id]);
    }

    async createOrder(cartId:number,deliveryFee:number,isPurchased:boolean) {
        const query = "select * from create_order($1,$2,$3)";
        return this.databaseService.query(query,[cartId,deliveryFee,isPurchased]);
    }

    async getManagerPendingOrders(managerId:number){
        const rawData = await this.databaseService.query<any>(
            'SELECT * FROM get_pending_orders_with_items_by_manager($1)', 
            [managerId]
          );

            // Format the raw data into structured orders
    const ordersMap = new Map<number, OrderWithItemsDto>();

    rawData.forEach(row => {
      if (!ordersMap.has(row.order_id)) {
        ordersMap.set(row.order_id, {
          orderId: row.order_id,
          cartId: row.cart_id,
          deliveryFee: row.delivery_fee,
          isPurchased: row.is_purchased,
          status: row.status,
          items: [],
        });
      }

      // Push item with its category to the respective order
      ordersMap.get(row.order_id).items.push({
        itemId: row.item_id,
        title: row.item_title,
        price: row.item_price,
        photoUrl: row.item_photo_url,
        category: {
          categoryId: row.category_id,
          name: row.category_name,
        },
      });
    });

        return Array.from(ordersMap.values());
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
