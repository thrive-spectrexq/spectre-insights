// frontend/plugins/axios.ts

import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    // Create an Axios instance
    const api = axios.create({
        baseURL: config.public.axios.apiBase,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // Add request interceptor to include auth token if available
    api.interceptors.request.use(
        (request) => {
            const token = config.auth.token // Ensure you have a way to set this token
            if (token) {
                request.headers.Authorization = `Bearer ${token}`
            }
            return request
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    // Add response interceptor for global error handling
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            // Handle specific status codes or errors globally
            return Promise.reject(error)
        }
    )

    // Provide the Axios instance globally
    nuxtApp.provide('axios', api)
})
