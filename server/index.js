/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-console */
import express from 'express';


import route from './routes/propertyRoutes';

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.use('/api/v1', route);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}...`);
});

export default app;
