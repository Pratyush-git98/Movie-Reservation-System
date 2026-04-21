import {
    createTheater,
    getAllTheaters,
    getTheaterById,
    updateTheater,
    deleteTheater
} from '../controllers/theatre.controller.js';
import { Router } from 'express';

const router = Router();

router.post('/', createTheater);
router.get('/', getAllTheaters);
router.get('/:id', getTheaterById);
router.put('/:id', updateTheater);
router.delete('/:id', deleteTheater);

export default router;