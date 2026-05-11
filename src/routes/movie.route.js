import {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
} from '../controllers/movie.controller.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { Router } from 'express';

const router = Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', verifyJWT, roleMiddleware('admin'), createMovie);
router.put('/:id', verifyJWT, roleMiddleware('admin'), updateMovie);
router.delete('/:id', verifyJWT, roleMiddleware('admin'), deleteMovie);

export default router;