import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_PREFIX_API_URL,
    timeout: 5000,
    headers: {
        'apiKey': '84a28dc79ce34efb9120a52b3d51cb334d812497',
        'accept': 'application/json',
    },
});

export default axiosConfig;
