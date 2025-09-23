import {Router} from "express"
import { registerDoctor } from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router ();

router.route("/register").post(
    upload.single('avatar'),
    registerDoctor
)

export default router

