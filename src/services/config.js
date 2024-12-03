// base configuration for api calls
export const API_CONFIG = {
    // base urls for different apis
    URLS: {
        LOCAL_API: 'https://3efgsfe513.execute-api.us-east-1.amazonaws.com',
        OFFICE_API: 'https://theofficeapi.dev/api'
    },

    // request timeout in milliseconds
    TIMEOUT: 5000,

    // default headers for all requests
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json'
    }
};