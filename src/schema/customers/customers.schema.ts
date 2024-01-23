import { Field, InputType, ObjectType } from 'type-graphql'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { IsEmail, IsString } from 'class-validator'
import mongoose from 'mongoose'

@ObjectType()
class Address {
    @Field(() => String)
    @prop()
    line1: string

    @Field(() => String)
    @prop()
    line2: string

    @Field(() => String)
    @prop()
    postcode: string

    @Field(() => String)
    @prop()
    city: string

    @Field(() => String)
    @prop()
    state: string

    @Field(() => String)
    @prop()
    country: string
}

@ObjectType()
export class Customer {
    @Field(() => String)
    @prop({ required: true })
    firstName: string

    @Field(() => String)
    @prop({ required: true })
    lastName: string

    @Field(() => String)
    @prop({ required: true })
    email: string

    @Field(() => Address)
    @prop()
    address: Address

    @Field(() => String)
    @prop({ default: Date.now() })
    createdAt: Date
}

export const CustomerModel = getModelForClass(Customer)

@ObjectType()
export class CustomerAnonymized {
    @Field(() => String)
    @prop({ required: true })
    _id: mongoose.Schema.Types.ObjectId

    @Field(() => String)
    @prop({ required: true })
    firstName: string

    @Field(() => String)
    @prop({ required: true })
    lastName: string

    @Field(() => String)
    @prop({ required: true })
    email: string

    @Field(() => Address)
    @prop()
    address: Address

    @Field(() => String)
    @prop()
    createdAt: Date
}

export const CustomerAnonymizedModel = getModelForClass(CustomerAnonymized)
