import mongoose from 'mongoose'
require('dotenv').config();

export const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
}