import {Router} from "express"
import { loginDoctor, logoutDoctor, registerDoctor } from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router ();

router.route("/register").post(
    upload.single('avatar'),
    registerDoctor
)

router.route("/login").post(loginDoctor)
router.route("/logout").post(verifyJWT,logoutDoctor)

export default router

