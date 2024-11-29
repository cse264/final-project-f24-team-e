// base configuration for api calls
export const API_CONFIG = {
    // base urls for different apis
    URLS: {
        LOCAL_API: 'http://localhost:3001',
        OFFICE_API: 'https://theofficeapi.dev/api'
    },

    // request timeout in milliseconds
    TIMEOUT: 5000,

    // default headers for all requests
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json'
    }
};