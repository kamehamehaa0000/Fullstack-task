import { Request, Response } from 'express'
import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import { Contact } from '../models/contact.model'

const addContact = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, mobile, city } = req.body

  if (!fullName || !email || !mobile || !city) {
    throw new ApiError(400, 'All fields are required')
  }

  const contact = await Contact.create({ fullName, email, mobile, city })

  return res
    .status(201)
    .json(new ApiResponse(201, contact, 'Contact added successfully'))
})

const getAllContacts = asyncHandler(async (req: Request, res: Response) => {
  const contacts = await Contact.find()
  return res
    .status(200)
    .json(new ApiResponse(200, contacts, 'Contacts retrieved successfully'))
})

export { addContact, getAllContacts }
