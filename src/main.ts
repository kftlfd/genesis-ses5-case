import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as hbs from 'express-handlebars';

import { AppModule } from '@/app.module';
import { AppConfig } from '@/core/config/config';
import { DBService } from '@/core/db/db.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = new ConsoleLogger({ timestamp: true });
  logger.setContext('App');
  app.useLogger(logger);

  const conf = app.get(AppConfig);

  const db = app.get(DBService);
  await db.testConnection();

  const rootDir = join(__dirname, '..');
  app.useStaticAssets(join(rootDir, 'public'));
  app.setBaseViewsDir(join(rootDir, 'views'));
  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      layoutsDir: join(rootDir, 'views', 'layouts'),
      compilerOptions: { noEscape: true },
    }),
  );
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('Subscribe to weather updates')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  const { HOST, PORT } = conf.env;
  await app.listen(PORT, HOST, () => {
    logger.log(`running on ${HOST}:${PORT}`);
  });
}
bootstrap().catch(console.error);
