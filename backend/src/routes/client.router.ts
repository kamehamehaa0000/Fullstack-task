import { Router } from 'express'
import {
  getAllClients,
  addClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller'
import upload from '../config/multer'
import { authAdmin } from '../middlewares/adminAuth.middleware'

const router = Router()

router.get('/getall', getAllClients)
router.post('/add', authAdmin, upload.single('image'), addClient)
router.put('/update/:id', authAdmin, upload.single('image'), updateClient)
router.delete('/delete/:id', authAdmin, deleteClient)

export default router
