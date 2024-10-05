// frontend/server/api/admin/dashboard.get.ts
import { defineEventHandler, createError } from 'h3'
import { getAuth } from '@sidebase/nuxt-auth'

export default defineEventHandler(async (event) => {
    const auth = await getAuth(event)
    const user = auth.user

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Proceed with fetching dashboard data
    const dashboardData = {
        totalUsers: 100,
        totalSales: 5000,
        // Add more metrics as needed
    }

    return dashboardData
})
