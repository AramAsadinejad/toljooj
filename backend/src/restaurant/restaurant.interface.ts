export interface RestaurantCreationInterface{
    name:string,
    min_purchase:number,
    deliveryRadius:number,
    managerId?:number,
    locationX:number,
    locationY:number,
    address:string,
    imageUrl?:string ,
}


export interface RestaurantUpdateInterface{
    name?:string,
    min_purchase?:number,
    deliveryRadius?:number,
    locationX?:number,
    locationY?:number,
    address?:string,
    imageUrl?:string ,
    id : number
}
enum WeekDay{
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
export interface OpenRestCreationInterface{
    startHour:string,
    endHour : string, 
    dayOfWeek:WeekDay
}


export class OpenRestDto {
    startHour: string; // "9:30" or "13:45"
    endHour: string;   // "18:00" or "23:30"
    dayOfWeek: number; // Enum (1=Monday, ..., 7=Sunday)
  }
  
export class CreateOpenRestDto {
    restId: number;
    openHours: OpenRestDto[];
  }