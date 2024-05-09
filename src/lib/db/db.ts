import mongoose, { Mongoose } from 'mongoose';
import { SECRET_MONGO_URI } from '$env/static/private';

interface Connection {
    isConnected?: number;
}

const connection: Connection = {};

const dbConnect: () => Promise<void> = async () => {
    if (connection.isConnected) {
        return;
    }
    if (!SECRET_MONGO_URI) {
        throw new Error('Please define the SECRET_MONGO_URI environment variable inside .env');
    }

    const db: Mongoose = await mongoose.connect(SECRET_MONGO_URI);

    connection.isConnected = db.connections[0].readyState;
};

export { dbConnect };