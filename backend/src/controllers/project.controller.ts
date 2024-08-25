import { Request, Response } from 'express'
import { Project } from '../models/project.model'
import asyncHandler from '../utilities/AsyncHandler'
import ApiResponse from '../utilities/ResponseHandler'
import ApiError from '../utilities/ErrorHandler'
import { uploadToCloudinary } from '../utilities/cloudinaryUtils'

const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find()
  if (!projects.length) {
    throw new ApiError(404, 'No projects found')
  }
  res
    .status(200)
    .json(new ApiResponse(200, projects, 'Projects fetched successfully'))
})

const addProject = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body
  const file = (req.file as Express.Multer.File) || undefined

  if (!name || !description || !file) {
    throw new ApiError(400, 'Name, description, and image file are required')
  }

  const imageUrl = (await uploadToCloudinary(file.path))?.url
  const project = new Project({
    name,
    description,
    imageUrl,
  })

  await project.save()
  res
    .status(201)
    .json(new ApiResponse(201, project, 'Project created successfully'))
})

const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, description } = req.body
  const file = (req.file as Express.Multer.File) || undefined

  const project = await Project.findById(id)
  if (!project) {
    throw new ApiError(404, 'Project not found')
  }

  if (name) project.name = name
  if (description) project.description = description
  if (file) project.imageUrl = (await uploadToCloudinary(file.path))?.url

  await project.save()
  res
    .status(200)
    .json(new ApiResponse(200, project, 'Project updated successfully'))
})

const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const project = await Project.findByIdAndDelete(id)
  if (!project) {
    throw new ApiError(404, 'Project not found')
  }
  res
    .status(200)
    .json(new ApiResponse(200, null, 'Project deleted successfully'))
})

export { getAllProjects, addProject, updateProject, deleteProject }
