export class OrderWithItemsDto {
    orderId: number;
    cartId: number;
    deliveryFee: number;
    isPurchased: boolean;
    status: boolean;
    items: ItemWithCategoryDto[];
  }
  
  export class ItemWithCategoryDto {
    itemId: number;
    title: string;
    price: number;
    photoUrl: string;
    category: CategoryDto;
  }
  
  export class CategoryDto {
    categoryId: number;
    name: string;
  }
  