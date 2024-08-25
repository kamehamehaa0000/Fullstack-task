import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IClient {
  name: string
  designation: string
  description: string
  imageUrl: string
}

const ClientSchema = new Schema<IClient>({
  name: {
    type: String,
    required: true,
    min: [3, 'Minimum 3 character are required as name'],
  },
  description: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
})

const Client = mongoose.model<IClient>('Client', ClientSchema)

export { Client }
