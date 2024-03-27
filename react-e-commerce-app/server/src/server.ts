import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DATABASE?.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD ?? ''
);

mongoose
	.connect(DB ?? '')
	.then(() => {
		console.log('DB Connected');
	})
	.catch((err) => {
		console.log(err);
	});

// Start And Listen Server
const port = process.env.PORT ?? 8000;
app.listen(port, () => {
	console.log('express init', port);
});
