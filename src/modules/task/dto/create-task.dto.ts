import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateTaskDto {
  constructor(partial: Partial<CreateTaskDto>) {
    Object.assign(this, partial)
  }

  @IsString()
  @IsNotEmpty()
  text: string;

  // @IsString()
  // @IsOptional()
  // userId?: string | null;
}
