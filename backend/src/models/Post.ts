// src/models/Post.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    author: string; // Author could be an Admin or User
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // or 'User'
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema);
