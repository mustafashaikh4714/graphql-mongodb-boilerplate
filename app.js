// import express from 'express'
import bodyParser from 'body-parser'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import Mutation from './src/resolvers/Mutation'
import Query from './src/resolvers/Query'

const pubsub = new PubSub()
const port = process.env.PORT || 4001

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Mutation,
    Query
  },
  context({ request }) {
    return { pubsub, request }
  }
})

server.express.use(bodyParser.json())
require('./config/database')

server.start(() =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
)
