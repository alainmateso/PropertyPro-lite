/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-console */
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import documentation from '../apiDocumentation.json';

import route from './routes/propertyRoutes';
import userRouter from './routes/userRoutes';

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', route);
app.use('/api/v1', userRouter);
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(documentation));
app.use('*', (req, res) => {
	res.status(404).json({
		status: res.statusCode,
		error: 'Incorrect route'
	})
});

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}...`);
});

export default app;
