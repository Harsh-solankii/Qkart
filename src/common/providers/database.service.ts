import { user } from 'src/users/users.entity';
import { Sequelize } from 'sequelize-typescript';


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
