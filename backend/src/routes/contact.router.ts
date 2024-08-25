import { Router } from 'express'
import { addContact, getAllContacts } from '../controllers/contact.controller'
import { authAdmin } from '../middlewares/adminAuth.middleware'

const router = Router()
router.post('/add', addContact)
router.get('/getall', authAdmin, getAllContacts)

export default router
