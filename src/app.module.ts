import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UseractivityModule } from './useractivity/useractivity.module';
import * as Joi from 'joi';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DeleterequestModule } from './deleterequest/deleterequest.module';



const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.${ENV}.env`,
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: false,
      logging: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'image'),
    }),
    AuthModule,
    DashboardModule,
    UseractivityModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      defaults: {
        from: '"papaden-admin" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MailModule,
    DeleterequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
