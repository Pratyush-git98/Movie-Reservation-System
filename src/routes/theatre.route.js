import {
    createTheater,
    getAllTheaters,
    getTheaterById,
    updateTheater,
    deleteTheater
} from '../controllers/theatre.controller.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import { Router } from 'express';

const router = Router();

router.get('/', getAllTheaters);
router.get('/:id', getTheaterById);
router.post('/', verifyJWT, roleMiddleware('admin'), createTheater);
router.put('/:id', verifyJWT, roleMiddleware('admin'), updateTheater);
router.delete('/:id', verifyJWT, roleMiddleware('admin'), deleteTheater);

export default router;