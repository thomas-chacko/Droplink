import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the global type to include mongoose
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  } | undefined;
}

// Cache the connection promise to prevent duplicate connections
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached && cached.conn) {
        console.log('Using existing MongoDB connection');
        return cached.conn;
    }

    if (cached && !cached.promise) {
        console.log('Creating new MongoDB connection...');
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
            console.log('Successfully connected to MongoDB');
            return mongooseInstance.connection;
        }).catch((error) => {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        });
    }

    try {
        if (cached) {
            cached.conn = await cached.promise!;
        }
    } catch (e) {
        if (cached) {
            cached.promise = null;
        }
        console.error('Failed to establish MongoDB connection:', e);
        throw e;
    }

    console.log('MongoDB connection established');
    return cached?.conn;
}

export default connectDB;