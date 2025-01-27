import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // Serve static files from the 'uploads' folder
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads', // This is the URL prefix for accessing the files
    });
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
