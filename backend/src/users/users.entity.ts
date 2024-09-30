import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class user extends Model {
  @Column
  firstname: string;

  @Column
  lastname: string;
  
  @Column
  email: string;
 
  @Column
  phoneno: string;

  @Column
  age: number;

  @Column
  password: string;
}