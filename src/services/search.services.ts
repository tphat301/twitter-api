import { SearchQuery } from '~/models/requests/Search.requests'
import databaseService from './database.services'

class SearchService {
  async search({ email, limit, page }: { email: string; limit: number; page: number }) {
    const result = await databaseService.users
      .find({
        $text: {
          $search: email
        }
      })
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
    return result
  }
}

const searchService = new SearchService()

export default searchService
