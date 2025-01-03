import { defineNuxtPlugin, NuxtApp, useRuntimeConfig } from '#app';
import mongoose from 'mongoose';

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
    const config = useRuntimeConfig();
    const mongoUri = config.public.MONGO_URI;

    if (!mongoUri) {
        console.error('MongoDB URI is not provided in the runtime configuration.');
        return;
    }

    try {
        // Check the connection state to avoid reconnecting unnecessarily
        if (mongoose.connection.readyState === 0) {
            console.log('Connecting to MongoDB...');
            await mongoose.connect(mongoUri, {
                // useUnifiedTopology is no longer required in the latest versions of Mongoose
            });
            console.log('Connected to MongoDB successfully.');
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }

    // Provide the mongoose instance globally
    nuxtApp.provide('mongoose', mongoose);
});
