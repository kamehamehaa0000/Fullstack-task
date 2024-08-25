import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import Admin from '../models/admin.model'

interface AuthenticatedRequest extends Request {
  admin?: any
}

export const authAdmin = asyncHandler(
  async (
    req: Request | AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string
      }
      ;(req as AuthenticatedRequest).admin = await Admin.findById(
        decoded.id
      ).select('-password')

      if (!(req as AuthenticatedRequest).admin) {
        throw new ApiError(401, 'Not authorized, token failed')
      }

      next()
    } else {
      throw new ApiError(401, 'Not authorized, no token')
    }
  }
)
