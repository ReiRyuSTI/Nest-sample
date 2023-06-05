import { DataSource } from 'typeorm';
import { Item } from './entities/item.entity';
import { User } from './entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // MySQL の場合
  host: 'localhost', // docker-compose.yml で指定したコンテナの service 名
  port: 5432, // ポート番号
  username: 'postgres', // docker-compose.yml の MYSQL_USER
  password: 'postgres', // docker-compose.yml の MYSQL_PASSWORD
  database: 'postgres', // docker-compose.yml の MYSQL_DATABASE
  entities: [Item, User], // エンティティクラスを指定する（複数の場合はカンマで区切る）
  migrations: [__dirname + '/migration/*.ts'],
});
