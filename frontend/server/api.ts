// frontend/server/api.ts
import { useNuxtApp } from '#app'

export const useApi = () => {
    const { $axios } = useNuxtApp()

    const getServices = () => {
        return $axios.get('/services')
    }

    const getFeaturedProducts = () => {
        return $axios.get('/products?featured=true')
    }

    const getFeaturedBlogPosts = () => {
        return $axios.get('/blog-posts?featured=true')
    }

    const getAllProducts = () => {
        return $axios.get('/products')
    }

    // Add more API methods as needed

    return {
        getServices,
        getFeaturedProducts,
        getFeaturedBlogPosts,
        getAllProducts,
        // ...
    }
}
