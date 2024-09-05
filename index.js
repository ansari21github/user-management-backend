import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoDB from './db.js';
import userManageRoutes from './routes/manageRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

import userRoutes from './routes/createUser.js'

dotenv.config();
mongoDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userManageRoutes);
app.use('/api', userRoutes)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});