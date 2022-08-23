import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import appDataSource from "./config/database";

dotenv.config();

const index: Express = express();
const port = process.env.PORT;

appDataSource
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
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
