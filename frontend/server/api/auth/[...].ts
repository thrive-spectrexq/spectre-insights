// frontend/server/api/auth/[...].ts
import { defineEventHandler } from 'h3'
import { NuxtAuthHandler } from '@sidebase/nuxt-auth'

export default defineEventHandler((event) => {
    return NuxtAuthHandler(event)
})
