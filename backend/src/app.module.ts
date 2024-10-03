import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { mailermodule } from './common/modules/mailer.module';
import { databaseservice } from './database/database.service';


@Module({
  imports: [AuthModule, UsersModule,mailermodule],
  controllers: [AppController],
  providers: [AppService,...databaseservice],
})
export class AppModule {}
