import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
import { type IAppError } from './types/error';

process.on('uncaughtException', (err: IAppError) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config();

const DB = process.env.DATABASE?.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD ?? ''
);

void mongoose.connect(DB ?? '', {}).then(() => {
	console.log('DB Connected');
});

// Start And Listen Server
const port = process.env.PORT ?? 8000;
const server = app.listen(port, () => {
	console.log('express init', port);
});

process.on('unhandledRejection', (err: IAppError) => {
	console.log('UNHANDLED REJECTION! Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

process.on('SIGTERM', () => {
	console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
	server.close(() => {
		console.log('Process terminated!');
	});
});
