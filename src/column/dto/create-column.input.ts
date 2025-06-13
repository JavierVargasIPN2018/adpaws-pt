import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateColumnInput {
  @Field()
  name: string;

  @Field()
  order: number;

  @Field()
  userId: string;
}
