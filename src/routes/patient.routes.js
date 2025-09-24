import {Router} from "express"
import { newPatient } from "../controllers/patient.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router ();

router.route("/newPatient").post(newPatient)

export default router