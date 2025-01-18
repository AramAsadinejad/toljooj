import { Injectable } from '@nestjs/common';
import {Client} from 'pg';
@Injectable()
export class DatabaseService {
    private client: Client;

  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: '163.5.94.58',
      database: 'toljooj',
      password: 'Erf@nk2004',
      port: 5432,
    });
    this.client.connect();
  }

  async query(query: string, params: any[] = []): Promise<any> {
    const res = await this.client.query(query, params);
    return res.rows;
  }

  async close(){
    await this.client.end();
  }
}
