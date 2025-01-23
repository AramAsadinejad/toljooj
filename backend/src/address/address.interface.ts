import { UserInterface } from "src/user/user.interface";


export interface AddressInterface{
    address_id: number;
    isdefault: boolean;
    value: string;
    user:UserInterface;
}

export interface AddressCreationOrUpdateInterface{
    isDefault: boolean;
    value: string;
}
