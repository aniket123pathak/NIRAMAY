import {Router} from "express"
import { loginDoctor, registerDoctor } from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router ();

router.route("/register").post(
    upload.single('avatar'),
    registerDoctor
)

router.route("/login").post(loginDoctor)

export default router

