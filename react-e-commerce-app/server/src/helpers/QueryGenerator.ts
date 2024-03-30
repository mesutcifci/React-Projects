import type { Query, FilterQuery, Document } from 'mongoose';
import type QueryString from 'qs';

export default class QueryGenerator<T extends Document> {
	query: Query<T[], T>;
	queryObject: QueryString.ParsedQs;
	productLimits: { '10': 10; '20': 20; '30': 30 };
	constructor(query: Query<T[], T>, queryObject: QueryString.ParsedQs) {
		this.query = query;
		this.queryObject = queryObject;
		this.productLimits = {
			'10': 10,
			'20': 20,
			'30': 30,
		};
	}

	filter(): this {
		// We need to convert query object to valid mongoose query strings
		// Example: { price: { gte: 5 } } to { price: {$gte: 5 } }
		let queryString = JSON.stringify(this.queryObject);
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);
		const parsedQueryObject: FilterQuery<T> = JSON.parse(queryString);
		void this.query.find(parsedQueryObject);
		return this;
	}

	select(): this {
		if (this.queryObject.fields) {
			// Convert invalid { fields: { 'name,price' } } to
			// valid mongoose query string { fields: { name price} }
			// The query will only returns name and price fields
			this.queryObject.fields = (this.queryObject.fields as string)
				.split(',')
				.join(' ');
		} else {
			// MongoDB adds this value to documents. We don't need to return it to the clients.
			this.queryObject.fields = '-__v';
		}
		void this.query.select(this.queryObject.fields);
		return this;
	}

	sort(): this {
		// Sort by created date by default
		let sorter = '-createdAt';
		if (this.queryObject.sort) {
			// Convert invalid 'ratingsAverage,price' to
			// valid mongoose query string ratingsAverage price
			sorter = (this.queryObject.sort as string).split(',').join(' ');
			void this.query.sort(sorter);
		}

		return this;
	}

	paginate(): this {
		const page = this.queryObject.page ? +this.queryObject.page : 1;
		const limit =
			this.queryObject.limit &&
			(this.queryObject.limit as string) in this.productLimits
				? +this.queryObject.limit
				: 10;
		// If page is 2 and limit is 10 we show only 11th to 20th products
		// So we need to skip first 10 product
		const skip = (page - 1) * limit;

		void this.query.skip(skip).limit(limit);

		return this;
	}
}
