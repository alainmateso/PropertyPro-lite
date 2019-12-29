/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import documentation from '../apiDocumentation.json';
import dotENV from 'dotenv';
import propertyRoutes from '../server/routes/propertyRoutes';
import userRoutes from '../server/routes/userRoutes'

dotENV.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v2', userRoutes);
app.use('/api/v2', propertyRoutes);
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
