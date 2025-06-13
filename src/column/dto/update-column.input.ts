import { Field, InputType, ID, PartialType } from '@nestjs/graphql';
import { CreateColumnInput } from './create-column.input';

@InputType()
export class UpdateColumnInput extends PartialType(CreateColumnInput) {
  @Field(() => ID)
  id: string;
}
