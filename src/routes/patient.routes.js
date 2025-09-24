import {Router} from "express"
import { createPatient } from "../controllers/patient.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router ();

router.route("/createPatient").post(verifyJWT,createPatient)

export default router