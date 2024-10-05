// frontend/server/api/services.get.ts
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    // Replace with your actual data fetching logic
    const services = [
        { id: 1, title: 'Analytics', description: 'Comprehensive analytics services.' },
        { id: 2, title: 'Consulting', description: 'Expert consulting to boost your business.' },
        { id: 3, title: 'Support', description: '24/7 support for all your needs.' },
    ]

    return services
})
