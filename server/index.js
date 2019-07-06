import express from 'express';
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


import route from './routes/propertyRoutes';

const PORT = process.env.PORT || 3000;

app.use('/api/v1', route);

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}...`)
});

export default app;
