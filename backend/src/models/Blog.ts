// backend/src/models/Blog.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    category: string;
    tags: string[];
    coverImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Blog content is required'],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Author is required'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['Technology', 'Business', 'Lifestyle', 'Health', 'Other'], // Customize as needed
            default: 'Other',
        },
        tags: {
            type: [String],
            default: [],
        },
        coverImage: {
            type: String, // URL or path to the image
            default: '',
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
