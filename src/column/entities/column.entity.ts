import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Column {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  order: number;

  @Field()
  userId: string;
}
