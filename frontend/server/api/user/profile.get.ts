// frontend/server/api/user/profile.get.ts
//import { defineEventHandler } from 'h3'
//import { getAuth } from '@sidebase/nuxt-auth'

//export default defineEventHandler(async (event) => {
//    const auth = getAuth(event)
//    const user = auth.user

//    if (!user) {
//        return { error: 'Unauthorized' }
//    }

//    // Replace with your actual user profile fetching logic
//    const userProfile = {
//        id: user.id,
//        name: user.name,
//        email: user.email,
//        // Add more fields as needed
//    }

//    return userProfile
//})
