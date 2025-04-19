import express from 'express'
const routes = express.Router()
// import userController from '../controllers/userController.js'
import { createUser, loginUser } from '../controllers/userController.js';

routes.post('/register', createUser)
routes.post('/login', loginUser)

export default routes