// src/models/SiteSettings.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
    siteName: string;
    contactEmail: string;
    // Other settings as needed
}

const SiteSettingsSchema: Schema = new Schema({
    siteName: { type: String, required: true },
    contactEmail: { type: String, required: true },
});

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
