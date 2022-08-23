import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import myDataSource from "./config/database";

dotenv.config();

const index: Express = express();
const port = process.env.PORT;

console.log(123123);
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });

index.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

index.listen(port, () => {
  console.log(`⚡️[server]: Server [rw is running at https://localhost:${port}`);
});
