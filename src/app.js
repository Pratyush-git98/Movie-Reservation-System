import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.middleware.js';


const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the Movie Reservation System API!");
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes
import authRoutes from './routes/auth.route.js';
// import userRoutes from './routes/user.route.js';
// import movieRoutes from './routes/movie.route.js';
// import showRoutes from './routes/show.route.js';
// import theatreRoutes from './routes/theatre.route.js';
// import bookingRoutes from './routes/booking.route.js';

// Route declarations
const apiBasePath = '/api/v1';

app.use(`${apiBasePath}/auth`, authRoutes);
// app.use(`${apiBasePath}/users`, userRoutes);
// app.use(`${apiBasePath}/movies`, movieRoutes);
// app.use(`${apiBasePath}/shows`, showRoutes);
// app.use(`${apiBasePath}/theatres`, theatreRoutes);
// app.use(`${apiBasePath}/bookings`, bookingRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app