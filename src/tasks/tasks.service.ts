import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
      include: { board: true, user: true },
    });
  }

  findAll(status?: TaskStatus) {
    return this.prisma.task.findMany({
      where: status ? { status } : undefined,
      include: { board: true, user: true },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
}
