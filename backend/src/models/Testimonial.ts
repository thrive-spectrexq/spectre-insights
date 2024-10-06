// backend/src/models/Testimonial.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
    message: string;
    author: string;
}

const TestimonialSchema: Schema = new Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
