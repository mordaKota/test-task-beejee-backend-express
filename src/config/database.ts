import { User } from "../modules/user/entities/user.entity";
import { Task } from "../modules/task/entities/task.entity";
import { DataSource } from "typeorm"


const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "db",
  entities: [User, Task],
  synchronize: true,
});
export default appDataSource;
