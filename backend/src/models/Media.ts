// src/models/Media.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IMedia extends Document {
    url: string;
    type: string; // e.g., 'image', 'video'
    relatedEntity: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
}

const MediaSchema: Schema = new Schema({
    url: { type: String, required: true },
    type: { type: String, required: true },
    relatedEntity: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'type' },
    type: { type: String, required: true, enum: ['Blog'] },
}, { timestamps: true });

export default mongoose.model<IMedia>('Media', MediaSchema);
