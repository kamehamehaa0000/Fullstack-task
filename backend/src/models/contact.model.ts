import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IContact {
  fullName: string
  email: string
  mobile: string
  city: string
}

const ContactSchema = new Schema<IContact>({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
})

const Contact = mongoose.model<IContact>('Contact', ContactSchema)

export { Contact }
