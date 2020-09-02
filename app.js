// import express from 'express'
import bodyParser from 'body-parser'
import DataLoader from 'dataloader'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import User from './models/User'
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
      creatorLoader: new DataLoader(async (keys) => {
        const creators = await User.find({ _id: { $in: keys } })
        const creatorMap = {}

        creators.forEach((creator) => {
          creatorMap[creator._id] = creator
        })

        return keys.map((key) => creatorMap[key])
      })
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
