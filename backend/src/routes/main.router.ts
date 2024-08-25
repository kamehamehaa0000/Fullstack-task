import express from 'express'
import clientRouter from './client.router'
import newsletterRouter from './newsletter.router'
import projectRouter from './project.router'
import contactRouter from './contact.router'
import adminRouter from './admin.router'
const router = express.Router()
router.use('/contacts', contactRouter)
router.use('/projects', projectRouter)
router.use('/clients', clientRouter)
router.use('/newsletters', newsletterRouter)
router.use('/admin', adminRouter)
export { router as mainRouter }
