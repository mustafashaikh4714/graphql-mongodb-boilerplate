import mongoose from 'mongoose'

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('debug', (collectionName, method, query) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query))
})

mongoose.connect(process.env.DATABASE_URI)
mongoose.connection
  .once('open', () => console.log('Mongodb running'))
  .on('error', console.error.bind(console, 'MongoDB connection error:'))
