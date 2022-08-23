import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import appDataSource from '../../config/database';
import TaskNotFound from './errors/TaskNotFound';

export class TaskService {
  private readonly taskRepository: Repository<Task>
  constructor() {
    this.taskRepository = appDataSource.getRepository(Task)
  }
  create(createTaskDto: CreateTaskDto): Promise<Task | undefined> {
    createTaskDto.status = false;
    createTaskDto.userId = null;
    const newTask = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new TaskNotFound();
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | undefined> {
    const task = await this.findOne(id);
    if (task) {
      task.text = updateTaskDto.text;
    }
    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.findOne(id);
    if (task) {
      await this.taskRepository.delete(id);
    }
  }
}
