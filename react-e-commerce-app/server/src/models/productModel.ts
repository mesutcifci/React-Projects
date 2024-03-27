import mongoose from 'mongoose';

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

export default mongoose.model('Product', productSchema);
