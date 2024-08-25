import { Router } from 'express'
import {
  registerAdmin,
  loginAdmin,
  updateAdminProfile,
  getAdminProfile,
} from '../controllers/admin.controller'
import { authAdmin } from '../middlewares/adminAuth.middleware'
const router = Router()

router.post('/login', loginAdmin)
router.post('/register', registerAdmin)
router.put('/update', authAdmin, updateAdminProfile)
router.get('/current', authAdmin, getAdminProfile)

export default router
