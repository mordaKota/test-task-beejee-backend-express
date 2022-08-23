import dotenv from 'dotenv';
import appDataSource from "./config/database";
import App from "./app";
import * as http from "http";

dotenv.config();

const port = process.env.PORT || 4000;

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  });

App.set("port", port);
const server = http.createServer(App);
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
})

module.exports = App;
