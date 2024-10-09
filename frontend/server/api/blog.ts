// frontend/server/api/blog.ts

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(); // Access runtime config
    const query = useQuery(event);
    const backendApiUrl = config.public.API_BASE_URL;

    try {
        // Construct the URL for the backend API
        let url = `${backendApiUrl}/blogs`;

        // If there's a search query, append it
        if (query.q) {
            url += `/search?q=${query.q}`;
        }

        // Fetch the data from the actual backend API
        const response = await $fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Return the data received from the backend API
        return response;
    } catch (error: any) {
        // Handle errors
        throw createError({
            statusCode: error?.response?.status || 500,
            statusMessage: error?.message || 'Error fetching blog posts from backend',
        });
    }
});
