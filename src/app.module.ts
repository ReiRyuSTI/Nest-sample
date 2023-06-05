import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ItemsModule,
    AuthModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
