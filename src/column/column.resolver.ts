import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ColumnService } from './column.service';
import { Column } from './entities/column.entity';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';
import { UserId } from '../common/decorators/user-id.decorator'; // 👈 Asegúrate de importar esto

@Resolver(() => Column)
export class ColumnResolver {
  constructor(private readonly columnService: ColumnService) {}

  @Mutation(() => Column)
  createColumn(@UserId() userId: string, @Args('input') input: CreateColumnInput) {
    return this.columnService.create({ ...input, userId });
  }

  @Query(() => [Column], { name: 'columns' })
  getUserColumns(@UserId() userId: string) {
    return this.columnService.findAllByUser(userId);
  }

  @Mutation(() => Column)
  updateColumn(@Args('input') input: UpdateColumnInput) {
    return this.columnService.update(input);
  }

  @Mutation(() => Column)
  deleteColumn(@Args('id') id: string) {
    return this.columnService.remove(id);
  }
  
}

