// src/models/Comment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
    user: mongoose.Schema.Types.ObjectId;
    blog: mongoose.Schema.Types.ObjectId;
    content: string;
    createdAt: Date;
}

const CommentSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IComment>('Comment', CommentSchema);
