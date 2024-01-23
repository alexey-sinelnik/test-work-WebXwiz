import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import express, { Express } from 'express'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './resolvers'
import { GraphQLSchema } from 'graphql/type'
import { mongoConnect } from './utils/mongodb'
import CustomersService from './service/customers/customers.service'

async function bootstrap(): Promise<void> {
    const schema: GraphQLSchema = await buildSchema({
        resolvers,
    })
    const userService: CustomersService = new CustomersService()
    const app: Express = express()
    const port: string | undefined = process.env.PORT

    const server: any = new ApolloServer({
        schema,
        plugins: [],
    })

    await server.start()

    server.applyMiddleware({ app })
    app.listen(port, () => console.log(`App is listening port ${port}`))

    mongoConnect().then(() => console.log('Connected to db'))
    userService
        .generateCustomers()
        .then(() => console.log('Start generate customers'))
}

bootstrap()
