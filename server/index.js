import express from 'express';
const app = express();
app.use(express.json());

import route from './routes/propertyRoutes';

const PORT = process.env.PORT || 3000;

app.use('/api/v1', route);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}...`)
});

export default app;
