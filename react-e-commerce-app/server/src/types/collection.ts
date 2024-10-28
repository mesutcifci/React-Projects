import type { Document } from 'mongoose';

export interface ICollection extends Document {
	name: string;
}
