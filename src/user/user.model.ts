import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User extends mongoose.Document {
  @Field()
  @Prop({ required: true })
  userName: string;

  @Field()
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
