import { Request, Response } from 'express'
import { Client } from '../models/client.model'
import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from '../utilities/cloudinaryUtils'

const getAllClients = asyncHandler(async (req: Request, res: Response) => {
  const clients = await Client.find()
  return res
    .status(200)
    .json(new ApiResponse(200, clients, 'Clients fetched successfully'))
})

const addClient = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, designation } = req.body
  const file = req.file as Express.Multer.File

  if (!file) {
    throw new ApiError(400, 'Image is required')
  }

  const imageUrl = (await uploadToCloudinary(file.path)).url

  const client = new Client({
    name,
    description,
    designation,
    imageUrl,
  })

  await client.save()
  return res
    .status(201)
    .json(new ApiResponse(201, client, 'Client added successfully'))
})

const updateClient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description, designation } = req.body
  const file = req.file as Express.Multer.File

  const client = await Client.findById(id)

  if (!client) {
    throw new ApiError(404, 'Client not found')
  }

  if (file) {
    await deleteFromCloudinary(client.imageUrl)
    client.imageUrl = (await uploadToCloudinary(file.path)).url
  }

  client.name = name || client.name
  client.description = description || client.description
  client.designation = designation || client.designation

  await client.save()
  return res
    .status(200)
    .json(new ApiResponse(200, client, 'Client updated successfully'))
})

const deleteClient = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const client = await Client.findById(id)

  if (!client) {
    throw new ApiError(404, 'Client not found')
  }

  await deleteFromCloudinary(client.imageUrl)
  await Client.findByIdAndDelete(id)

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Client deleted successfully'))
})

export { getAllClients, addClient, updateClient, deleteClient }
