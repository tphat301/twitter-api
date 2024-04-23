import { pick } from 'lodash'
import { NextFunction, Request, Response } from 'express'
// export const filterMiddleware = (filterKeys: string[]) => (req: Request, res: Response, next: NextFunction) => {
//   req.body = pick(req.body, filterKeys)
//   next()
// }

// Nâng cấp hàm filter bằng generic type
export const filterMiddleware =
  <T>(filterKeys: Array<keyof T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
