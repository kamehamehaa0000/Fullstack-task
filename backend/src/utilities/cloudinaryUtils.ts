import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import '../config/env'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const uploadToCloudinary = async (localPath: string) => {
  try {
    if (!localPath) {
      throw new Error('Invalid or undefined local path')
    }
    const res = await cloudinary.uploader.upload(localPath, {
      resource_type: 'auto',
      transformation: [
        {
          aspect_ratio: '4:3',
          crop: 'fill',
          gravity: 'auto',
        },
      ],
    })

    fs.unlink(localPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`)
      }
    })

    return res
  } catch (error) {
    fs.unlink(localPath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`)
      }
    })
    console.log('Error occurred during Cloudinary upload ----- ', error)
    throw new Error('Error occurred during Cloudinary upload.')
  }
}

const deleteFromCloudinary = async (url: string): Promise<void> => {
  try {
    if (url) {
      const publicId = url.split('/').pop()?.split('.')[0] || ''
      if (publicId) {
        await cloudinary.uploader.destroy(publicId)
      } else {
        console.error('Invalid URL: Could not extract public ID.')
      }
    } else {
      console.error('URL is required.')
    }
  } catch (error) {
    console.error(
      `Error deleting image from Cloudinary: ${(error as Error).message}`
    )
  }
}

export { uploadToCloudinary, deleteFromCloudinary }
