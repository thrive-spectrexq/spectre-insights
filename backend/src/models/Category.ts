// src/models/Category.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    description?: string;
}

const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.model<ICategory>('Category', CategorySchema);
