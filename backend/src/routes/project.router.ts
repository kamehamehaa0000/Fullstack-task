import { Router } from 'express'
import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller'
import upload from '../config/multer'
import { authAdmin } from '../middlewares/adminAuth.middleware'

const router = Router()

router.get('/getall', getAllProjects)
router.post('/add', authAdmin, upload.single('image'), addProject)
router.put('/update/:id', authAdmin, upload.single('image'), updateProject)
router.delete('/delete/:id', authAdmin, deleteProject)

export default router
