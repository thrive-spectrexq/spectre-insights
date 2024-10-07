// src/models/Notification.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
    user: mongoose.Schema.Types.ObjectId;
    message: string;
    type: string;
    readStatus: boolean;
    createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    readStatus: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<INotification>('Notification', NotificationSchema);
