import {Router} from "express"
import { createVisit } from "../controllers/visit.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createVisit").post(verifyJWT,createVisit)

export {router}