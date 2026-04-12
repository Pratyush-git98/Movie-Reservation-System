import mongoose from 'mongoose';

const dbNAME = process.env.DB_NAME || 'movie_reservation_system';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${dbNAME}`);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;