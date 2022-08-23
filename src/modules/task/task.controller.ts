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

  create(createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  findAll() {
    return this.taskService.findAll();
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
