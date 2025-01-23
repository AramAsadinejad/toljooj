import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AddressCreationOrUpdateInterface, AddressInterface } from './address.interface';
import { UserInterface } from 'src/user/user.interface';

@Injectable()
export class AddressService {
    constructor(
        private databaseService: DatabaseService
    ){}

    async createAndUpdate(body:any) : Promise<any>{
        const query = "select insert_address($1,$2,$3)";
        return this.databaseService.query(query,[body.isDefault,body.value,body.user.id])

    }


    async getAdressesByUser(user:UserInterface) : Promise<AddressInterface[]>{
        const query = "select * from get_user_addresses($1)";
        const addresses = await this.databaseService.query<AddressInterface>(query,[user.id]);
        // console.log(addresses[0].address_id)
        return addresses;
    }
}
