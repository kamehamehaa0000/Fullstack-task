import { Router } from 'express'
import {
  addEmail,
  removeEmail,
  getAllEmails,
} from '../controllers/newsletter.controller'
import { authAdmin } from '../middlewares/adminAuth.middleware'

const router = Router()

router.post('/add', addEmail)
router.delete('/remove/:email', authAdmin, removeEmail)
router.get('/getall', authAdmin, getAllEmails)

export default router
