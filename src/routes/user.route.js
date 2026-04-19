import { Router } from "express";
import {
    getAllUsers,
    getUserProfile,
    updateUserProfile
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getAllUsers);

router.route("/:userId").get(getUserProfile);

router.route("/").put(verifyJWT, updateUserProfile);

export default router;