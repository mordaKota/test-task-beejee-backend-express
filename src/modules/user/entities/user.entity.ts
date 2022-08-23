import {Exclude} from "class-transformer";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {IsEmail, IsString, IsUUID} from "class-validator";
import {Task} from "../../task/entities/task.entity";

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

  @Column({ default: false })
  @Exclude()
  isAdmin: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
}
