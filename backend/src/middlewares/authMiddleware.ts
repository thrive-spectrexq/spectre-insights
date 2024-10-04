// backend/src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'

interface AuthRequest extends Request {
  user?: IUser
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}
