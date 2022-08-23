import {Exclude} from "class-transformer";
import {Column, Entity, PrimaryGeneratedColumn,} from 'typeorm';
import {IsEmail, IsString, IsUUID} from "class-validator";

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsString()
  login: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  isAdmin: boolean;
}
