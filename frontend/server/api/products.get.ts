// frontend/server/api/products.get.ts
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const featured = query.featured === 'true'

    // Replace with your actual data fetching logic
    const allProducts = [
        { id: 1, name: 'Product A', price: 99.99, image: '/images/product-a.jpg', featured: true },
        { id: 2, name: 'Product B', price: 149.99, image: '/images/product-b.jpg', featured: false },
        { id: 3, name: 'Product C', price: 199.99, image: '/images/product-c.jpg', featured: true },
    ]

    if (featured) {
        return allProducts.filter(product => product.featured)
    }

    return allProducts
})
