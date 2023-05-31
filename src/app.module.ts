import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ItemsModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [],
})
export class AppModule {}
