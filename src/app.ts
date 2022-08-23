import { TaskController } from "./modules/task/task.controller";
import bodyParser from "body-parser";
import express from "express";
import paginate from "express-paginate";
import { validate } from "class-validator";
import { CreateTaskDto } from "./modules/task/dto/create-task.dto";
import { instanceToPlain } from "class-transformer";

class App {
  public express: express.Application;
  public taskController: TaskController;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.taskController = new TaskController();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(paginate.middleware(10, 50));
  }

  private routes(): void {

    this.express.get('/task', async (req, res) => {

      const [ results, count ] = await this.taskController.paginate({
        filter: {},
        limits: { limit: req.query.limit, skip: req.query.skip },
        sorting: {},
      })
      const pageCount = Math.ceil(count / Number(req.query.limit));

      console.log({ results, count })

      res.json( {
        tasks: results.map(item => instanceToPlain(item)),
        pageCount,
        count,
        pages: paginate.getArrayPages(req)(3, pageCount, Number(req.query.page))
      });

    });

    this.express.post('/task', async (req, res) => {
      const errors = await validate(new CreateTaskDto(req.body));
      if (errors.length) {
        res.send(JSON.stringify(errors.map(error => ({ property: error.property, error: error.constraints }))));
        return;
      }

      const task = await this.taskController.create(req.body); // .then(data => res.json(data));

      res.send(instanceToPlain(task));
    });

    this.express.put(`/task/:id`, (req, res) => {
      this.taskController.update(req.params.id, req.body).then(data => res.json(data));
    });

    this.express.delete(`/task/:id`, (req, res) => {
      this.taskController.remove(req.params.id).then(data => res.json(data));
    });

    this.express.get('/', (req, res) => {
      res.send('Todo App Server');
    });

    this.express.use("*", (req, res, next) => {
      res.send("404 NOT FOUND");
    });
  }
}

export default new App().express;
