// frontend/plugins/axios.ts

export default function ({ $axios, store }) {
    $axios.onRequest((config) => {
        const token = store.state.auth.token;
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    });

    $axios.onError((error) => {
        const code = parseInt(error.response?.status);
        if (code === 401) {
            store.dispatch('auth/logout');
        }
        return Promise.reject(error);
    });
}
