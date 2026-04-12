import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/database/db.js';

dotenv.config(
    { path: './.env' }
);

console.log("Starting server...");

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    });