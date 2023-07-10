import  express  from "express";
import{ isAuthenticated } from '../middlewares/auth.js'

import {register,login, getMyProfile,logout } from '../controllers/details.js'

const router = express.Router();

router.post("/new", register);

router.post("/login", login);
router.get("/logout", logout);

router.get("/me",isAuthenticated, getMyProfile)

export default router;