import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SearchQuery } from '~/models/requests/Search.requests'
import searchService from '~/services/search.services'

export const searchController = async (req: Request<ParamsDictionary, any, any, SearchQuery>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const email = req.query.email
  const result = await searchService.search({
    limit,
    page,
    email
  })
  return res.json({
    message: 'Search respone successfully!',
    result
  })
}
