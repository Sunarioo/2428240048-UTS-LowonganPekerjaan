import express from 'express'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import lowongankerjaController from '../controllers/lowongankerja.controller.js'
import { logMiddleware } from '../middleware/log.middleware.js'

const router = express.Router()

router.use(logMiddleware)

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)
router.post('/lowongankerja', lowongankerjaController.store)
router.get('/lowongankerja', lowongankerjaController.index)
router.get('/lowongankerja/:id', lowongankerjaController.show)
router.put('/lowongankerja/:id', lowongankerjaController.update)
router.delete('/lowongankerja/:id', lowongankerjaController.delete)


export default router
