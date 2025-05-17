import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'express-handlebars';
import { AppModule } from './app.module';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({
      timestamp: true,
    }),
  });

  const baseDir = join(__dirname, '..');
  app.useStaticAssets(join(baseDir, 'public'));
  app.setBaseViewsDir(join(baseDir, 'views'));
  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      layoutsDir: join(baseDir, 'views', 'layouts'),
      compilerOptions: { noEscape: true },
    }),
  );
  app.setViewEngine('hbs');

  await app.listen(env.PORT, env.HOST);
}
bootstrap().catch(console.error);
