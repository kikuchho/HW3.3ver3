import Mongo from 'mongodb'
import Dotenv from 'dotenv'

// MONGO API Docs (for guide on inserting and deleting)
// https://www.mongodb.com/docs/drivers/node/current/

// Read in our secret environment variables

Dotenv.config()
const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'

// const DB_USER = 'AdvWebClass'
// const DB_PASS = 'advweb'

// Connection string and client object
const uri = `mongodb+srv://AdvWebClass:${DB_USER}:${DB_PASS}@cluster0.cwva3r7.mongodb.net/?retryWrites=true&w=majority`
// const uri = `mongodb+srv://AdvWebClass:${DB_USER}:${DB_PASS}@cluster0.cwva3r7.mongodb.net/?retryWrites=true&w=majority`
const client = new Mongo.MongoClient(uri, {
  useNewUrlParser: true, useUnifiedTopology: true, serverApi: Mongo.ServerApiVersion.v1
})

/**
 * Run a query on our MongoDB database
 * @param {function} queryCallback Function that receives the database object, should return a promise
 * @param {string} databaseName Name of the DB to connect to
 */
export default function queryDatabase (queryCallback, databaseName) {
  // Connect to the indicated database and pass the DB object to the callback
  // NOTE: Don't close the client connection
  queryCallback(client.db(databaseName))
    .catch(err => {
      // Log errors
      console.error('Failed to query database')
      console.error(err)
    })
}
