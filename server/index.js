/* eslint-disable no-tabs */
/* eslint-disable indent */
/* eslint-disable no-console */
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import documentation from '../apiDocumentation.json';

import routerV2 from '../server/RoutesV2/propertyRouteV2';
import userRouterV2 from '../server/RoutesV2/userRoutesV2'

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v2', routerV2);
app.use('/api/v2', userRouterV2);
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
