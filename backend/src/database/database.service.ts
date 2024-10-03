import { Sequelize } from 'sequelize-typescript';
import { user } from '../users/users.entity';

export const databaseservice = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
          const sequelize = new Sequelize({
            dialect: 'mysql',
            host:   process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,    
          });
          sequelize.addModels([user]);
    
          await sequelize.sync();
          return sequelize;
        },
      }
    ]
