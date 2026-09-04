import {
    createShow,
    getAllShows,
    getShowById,
    toggleShow
} from "../controllers/show.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", getAllShows);
router.get("/:id", getShowById);
router.post("/", verifyJWT, roleMiddleware("admin"), createShow);
router.patch("/:id", verifyJWT, roleMiddleware("admin"), toggleShow);

export default router;