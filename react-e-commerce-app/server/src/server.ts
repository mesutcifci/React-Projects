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

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A Product must have a name'],
		unique: true,
	},
	price: {
		type: Number,
		required: [true, 'A Product must have a price'],
	},
	discountPrice: {
		type: Number,
		default: 0,
	},
	stock: {
		type: Number,
		default: 0,
	},
});

const Product = mongoose.model('Product', productSchema);

const testProduct = new Product({
	name: 'Test Product 1',
	price: 300,
	stock: 10,
});

testProduct
	.save()
	.then((doc) => {
		console.log(doc);
	})
	.catch((err) => {
		console.log(err);
	});

// Start And Listen Server
const port = process.env.PORT ?? 8000;
app.listen(port, () => {
	console.log('express init', port);
});
