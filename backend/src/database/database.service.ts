import { Sequelize } from 'sequelize-typescript';
import { user } from '../users/users.entity';

export const databaseservice = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
          const sequelize = new Sequelize({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database:'test'
          });
          sequelize.addModels([user]);
    
          await sequelize.sync();
          return sequelize;
        },
      }
    ]
