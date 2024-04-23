import { PaginationReq } from './Pagination.request'

export interface SearchQuery extends PaginationReq {
  email: string
}
