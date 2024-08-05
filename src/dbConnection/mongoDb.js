import mongoose from "mongoose";

export async function connectToDb() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        connection.on('error', (err) => {
            console.error('Error connecting to MongoDB', err);
            process.exit();
        })

    } catch (error) {
        console.error('Something went wrong to connecting to db', error);
    }
}