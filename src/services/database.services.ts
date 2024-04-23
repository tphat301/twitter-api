import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import { User } from '~/models/schemas/User.schemas'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schemas'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.52xzlr6.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  // Kết nối tới mongodb
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  // Tạo và truy xuất tới collection users
  get users(): Collection<User> {
    return this.db.collection('users')
  }

  // Tạo và truy xuất tới collection refreshTokens
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection('refresh_tokens')
  }

  // Tạo và truy xuất tới collection followers
  get followers(): Collection<Follower> {
    return this.db.collection('followers')
  }

  async isIndexUser() {
    const exists = await this.users.indexExists(['email_text'])
    if (!exists) {
      await this.users.createIndex({ email: 'text' }, { default_language: 'none' })
    }
  }
}

const databaseService = new DatabaseService()
export default databaseService
