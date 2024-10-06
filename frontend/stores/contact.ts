// stores/contact.ts

import { defineStore } from 'pinia';
import axios from 'axios';

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export const useContactStore = defineStore('contact', {
    actions: {
        async sendMessage(form: ContactForm) {
            try {
                const response = await axios.post('/api/contact', form);
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    },
});
