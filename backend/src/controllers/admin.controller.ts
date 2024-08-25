import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import Admin from '../models/admin.model'

interface AuthenticatedRequest extends Request {
  admin?: any
}

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, password } = req.body

    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      throw new ApiError(400, 'Admin already exists')
    }

    const admin = await Admin.create({ username, password })

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    res
      .status(201)
      .json(new ApiResponse(201, { token }, 'Admin registered successfully'))
  }
)

export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body

  const admin = await Admin.findOne({ email })
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials')
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  })

  res.status(200).json(new ApiResponse(200, { token }, 'Login successful'))
})

export const getAdminProfile = asyncHandler(
  async (req: Request | AuthenticatedRequest, res: Response) => {
    const admin = await Admin.findById(
      (req as AuthenticatedRequest).admin!.id
    ).select('-password')
    if (!admin) {
      throw new ApiError(404, 'Admin not found')
    }
    res
      .status(200)
      .json(new ApiResponse(200, { admin }, 'Admin profile retrieved'))
  }
)

export const updateAdminProfile = asyncHandler(
  async (req: Request | AuthenticatedRequest, res: Response) => {
    const { username, password } = req.body
    const adminId = (req as AuthenticatedRequest).admin!.id

    const admin = await Admin.findById(adminId)
    if (!admin) {
      throw new ApiError(404, 'Admin not found')
    }

    if (username) admin.username = username
    if (password) admin.password = password

    const updatedAdmin = await admin.save()

    const token = jwt.sign({ id: updatedAdmin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    res.status(200).json(
      new ApiResponse(
        200,
        {
          admin: updatedAdmin,
          token,
        },
        'Admin profile updated successfully'
      )
    )
  }
)
