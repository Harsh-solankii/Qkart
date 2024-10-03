import { Sequelize } from 'sequelize-typescript';
import { user } from '../users/users.entity';

export const databaseservice = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {

          const sequelize = new Sequelize({
            dialect: 'mysql',
            host:process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,    
          });
          sequelize.addModels([user]);

          try {
            await sequelize.authenticate(); // Test the connection
            console.log('Database connection established successfully.');
          } catch (error) {
            console.log(error,"database err");
            throw error; // Rethrow to handle higher up
          }   
          await sequelize.sync();
          return sequelize;
        },
      }
    ]
