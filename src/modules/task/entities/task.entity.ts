import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../user/entities/user.entity";
import {IsBoolean, IsEmail, IsString, IsUUID} from "class-validator";

@Entity()
export class Task {
  constructor(partial: Partial<Task>) {
    Object.assign(this, partial)
  }

  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column()
  @IsString()
  @OneToOne(type => User, user => user.login)
  username: string;

  @Column()
  @IsEmail()
  @OneToOne(type => User, user => user.email)
  email: string;

  @Column()
  @IsString()
  text: string;

  @Column()
  @IsBoolean()
  status: boolean;
}
