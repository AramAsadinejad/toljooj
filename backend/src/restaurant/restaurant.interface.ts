interface RestaurantCreationInterface{
    name:string,
    min_purchase:number,
    deliveryRadius:number,
    managerId?:number,
    locationX:number,
    locationY:number,
    address:string,
    imageUrl?:string ,
}


interface RestaurantUpdateInterface{
    name?:string,
    min_purchase?:number,
    deliveryRadius?:number,
    locationX?:number,
    locationY?:number,
    address?:string,
    imageUrl?:string ,
    id : number
}

