import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { UserId } from '../common/decorators/user-id.decorator';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@UserId() userId: string, @Args('input') input: CreateTaskInput) {
    return this.taskService.create({ ...input, userId });
  }

  @Query(() => [Task], { name: 'tasks' })
  getTasksByUser(@UserId() userId: string) {
    return this.taskService.findAllByUser(userId);
  }

  @Mutation(() => Task)
  updateTask(@Args('input') input: UpdateTaskInput) {
    return this.taskService.update(input);
  }

  @Mutation(() => Task)
  deleteTask(@Args('id') id: string) {
    return this.taskService.remove(id);
  }
}
