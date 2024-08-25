import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  name: string
  description: string
  imageUrl: string
}

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      min: [3, 'Minimum 3 character are required as name'],
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Project = mongoose.model<IProject>('Project', ProjectSchema)

export { Project }
