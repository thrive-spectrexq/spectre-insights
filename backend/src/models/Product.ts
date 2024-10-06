// backend/src/models/Product.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    reviews: string[];
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        reviews: { type: [String], default: [] },
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
