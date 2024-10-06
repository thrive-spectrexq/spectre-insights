// backend/src/models/Service.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
    title: string;
    description: string;
    price: number;
    testimonials: string[];
}

const ServiceSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        testimonials: { type: [String], default: [] },
    },
    { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
