// src/models/Blog.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: mongoose.Schema.Types.ObjectId; // Reference to User or Admin
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: mongoose.Schema.Types.ObjectId, refPath: 'authorModel', required: true },
    authorModel: { type: String, required: true, enum: ['User', 'Admin'] },
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
