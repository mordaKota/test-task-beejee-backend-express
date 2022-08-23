import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import appDataSource from '../../config/database';


export class TaskController {
  private readonly taskService: TaskService;
  private readonly taskRepository: Repository<Task>
  constructor() {
    this.taskService = new TaskService();
    this.taskRepository = appDataSource.getRepository(Task);
  }

  async create(createTaskDto: CreateTaskDto) {
    try {
      const taskId = await this.taskService.create(createTaskDto);
      return this.taskService.findOne(taskId);
    } catch (err) {
      // console.error(err);
      throw err;
    }
  }

  findAll() {
    return this.taskService.findAll();
  }

  async paginate(query: any) {
    return Promise.all([
      this.taskService.paginate(query.filter, query.limits, query.sorting),
      this.taskService.count(query.filter),
    ]);
  }

  findOne(id: string) {
    return this.taskService.findOne(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  remove(id: string) {
    return this.taskService.remove(id);
  }
}
