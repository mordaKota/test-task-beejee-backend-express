import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import appDataSource from '../../config/database';
import TaskNotFound from './errors/TaskNotFound';
import {randomUUID} from 'crypto';

export class TaskService {
  private readonly taskRepository: Repository<Task>
  constructor() {
    this.taskRepository = appDataSource.getRepository(Task)
  }

  async create(createTaskDto: CreateTaskDto): Promise<string> {
    const id = randomUUID();
    const newTaskObj = {
      id,
      userId: '45448ff0-0edf-4ef3-ad13-13f244e87f9a',
      text: createTaskDto.text,
      status: false
    }

    const newTask = this.taskRepository.create(newTaskObj);
    await this.taskRepository.save(newTask);
    return id;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async count(filter: any): Promise<number> {
    return this.taskRepository.count({
      where: filter
    })
  }

  async paginate(filter: any, limits: any, sorting: any): Promise<Task[]> {
    return this.taskRepository.find({
      skip: limits.skip,
      take: limits.limit,
    });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

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
