// user.dto.ts
export class UserDTO {
    userId: number;
    username: string;
    email: string;
    addresses: AddressDTO[];
  }
  
  // address.dto.ts
  export class AddressDTO {
    addressId: number;
    isDefault: boolean;
    value: string;
  }
  