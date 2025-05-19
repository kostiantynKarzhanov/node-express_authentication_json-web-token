// ----- import built-in modules -----
import mongoose from 'mongoose';

// ----- import utils -----
import { stopServer } from '../utils/serverUtils.js';

const connectDatabase = async (dbString) => {   
    try {
        if (!dbString) throw new Error('Database string is not set');

        await mongoose.connect(dbString);
        
        console.log('Database connected');
    } catch (err) {
        console.error(err.stack);

        throw err;
    }

    mongoose.connection.on('error', (err) => {
        console.error(`Database connection error: ${err.message}`);

        stopServer(err.message);
    });
};

export default connectDatabase;
