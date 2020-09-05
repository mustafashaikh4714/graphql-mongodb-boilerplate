// import express from 'express'
import bodyParser from 'body-parser'
import DataLoader from 'dataloader'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import creatorLoader from './src/dataloaders/creatorLoader'
import Mutation from './src/resolvers/Mutation'
import Query from './src/resolvers/Query'
import Todo from './src/resolvers/Todo'

const pubsub = new PubSub()
const port = process.env.PORT || 4001

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Mutation,
    Query,
    Todo
  },
  context({ request }) {
    return {
      pubsub,
      request,
      creatorLoader: new DataLoader(creatorLoader)
    }
  }
})

server.express.use(bodyParser.json())
require('./config/database')

server.start(() =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
)
