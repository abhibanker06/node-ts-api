import {Router} from "express"
import {getUser,loginUser,logoutUser,registerUser} from "../controllers/authController"

const router = Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/",getUser);
router.get("/logout",logoutUser);


export default router