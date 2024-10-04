// backend/src/types/express.d.ts

import { Request, Response, NextFunction } from 'express'

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>
