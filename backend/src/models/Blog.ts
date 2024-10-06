// backend/src/models/Blog.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    category: string;
    tags: string[];
    createdAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        category: { type: String, required: true },
        tags: { type: [String], default: [] },
    },
    { timestamps: true }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
