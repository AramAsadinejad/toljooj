import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
    @Get('data')
    getData() {
        return { message: 'Hello from NestJS' };
    }
}
