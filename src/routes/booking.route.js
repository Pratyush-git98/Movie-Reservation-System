import {
    createBooking,
    getAllBookings,
    getMyBookings,
    getBookingById,
    cancelBooking
} from "../controllers/booking.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/",verifyJWT, roleMiddleware("admin"),getAllBookings);
router.get("/my", verifyJWT, getMyBookings);
router.get("/:id", verifyJWT,getBookingById);
router.post("/", verifyJWT, createBooking);
router.patch("/:id/cancel", verifyJWT, cancelBooking);

export default router;