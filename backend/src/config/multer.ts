import multer from 'multer'
import path from 'path'
import fs from 'fs'
import os from 'os'

const tempDir = path.join(os.tmpdir(), 'uploads')

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

const diskStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, tempDir)
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: diskStorage,
})

export default upload
