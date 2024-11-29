// src/services/utils/apiUtils.js
import { API_CONFIG } from '../config';
import { APIError } from '../errors';

// handles all api requests with timeout and error management
export const apiRequest = async (endpoint, options = {}) => {

    // setup abort controller for timeout handling
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    // make the api request with provided options
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    // clear timeout since request completed
    clearTimeout(timeoutId);

    // handle unsuccessful responses
    if (!response.ok) {
      let errorData;
      try {
        // attempt to parse error response
        errorData = await response.json();
      } catch {
        errorData = null;
      }
      throw new APIError(
        errorData?.message || `HTTP Error: ${response.status}`,
        response.status,
        errorData
      );
    }

    // parse and return successful response
    return await response.json();
  } catch (error) {
    // handle timeout errors
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', 408);
    }
    // handle all other errors
    throw error instanceof APIError
      ? error
      : new APIError('Network error occurred', 0, { originalError: error.message });
  }
};