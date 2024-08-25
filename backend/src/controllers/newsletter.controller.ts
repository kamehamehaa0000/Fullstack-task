import { Request, Response } from 'express'
import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import { Newsletter } from '../models/newsletter.model'

const addEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body

  if (!email) {
    throw new ApiError(400, 'Email is required')
  }

  const existingEmail = await Newsletter.findOne({ email })
  if (existingEmail) {
    throw new ApiError(409, 'Email is already subscribed')
  }

  const newEmail = await Newsletter.create({ email })

  return res
    .status(201)
    .json(new ApiResponse(201, newEmail, 'Email added to newsletter'))
})

const removeEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.params

  if (!email) {
    throw new ApiError(400, 'Email is required')
  }

  const removedEmail = await Newsletter.findOneAndDelete({ email })

  if (!removedEmail) {
    throw new ApiError(404, 'Email not found')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, removedEmail, 'Email removed from newsletter'))
})

const getAllEmails = asyncHandler(async (_req: Request, res: Response) => {
  const emails = await Newsletter.find()

  if (emails.length === 0) {
    throw new ApiError(404, 'No emails found')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, emails, 'Emails fetched successfully'))
})

export { addEmail, removeEmail, getAllEmails }
