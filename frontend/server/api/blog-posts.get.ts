// frontend/server/api/blog-posts.get.ts
import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const featured = query.featured === 'true'

    // Replace with your actual data fetching logic or Strapi integration
    const allPosts = [
        {
            id: 1,
            title: 'Understanding Analytics',
            excerpt: 'An in-depth look into analytics...',
            slug: 'understanding-analytics',
            coverImage: '/images/blog-analytics.jpg',
            featured: true,
        },
        {
            id: 2,
            title: 'Business Consulting Tips',
            excerpt: 'Top tips for effective business consulting...',
            slug: 'business-consulting-tips',
            coverImage: '/images/blog-consulting.jpg',
            featured: false,
        },
        {
            id: 3,
            title: 'Enhancing Customer Support',
            excerpt: 'Strategies to improve your customer support...',
            slug: 'enhancing-customer-support',
            coverImage: '/images/blog-support.jpg',
            featured: true,
        },
    ]

    if (featured) {
        return allPosts.filter(post => post.featured)
    }

    return allPosts
})
