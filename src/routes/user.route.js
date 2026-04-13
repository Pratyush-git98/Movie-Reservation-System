import { Router } from "express";
import {
    getAllUsers,
    getUserProfile,
    updateUserProfile
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserProfile);
router.put("/users/:userId", updateUserProfile);

export default router;