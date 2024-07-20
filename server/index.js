import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AdminRouter } from './routes/auth.js';
import './db.js'

// Load environment variables as early as possible
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(cookieParser());

app.use('/auth', AdminRouter);

const PORT =  3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
