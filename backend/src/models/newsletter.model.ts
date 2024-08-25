import mongoose, { Schema, Document, Types } from 'mongoose'

export interface INewsletter {
  email: string
}

const NewsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: true,
  },
})

const Newsletter = mongoose.model<INewsletter>('Newsletter', NewsletterSchema)

export { Newsletter }
