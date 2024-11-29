import { apiRequest } from '../utils/apiUtils';
import { APIError } from '../errors';
import { API_CONFIG } from '../config';

export const characterService = {

    // fetch all characters
    async getAll(page = 1) {
        try {
            const response = await apiRequest(`/characters?page=${page}&includeEpisodes=true`, {
                baseUrl: API_CONFIG.URLS.OFFICE_API
            });
            return {
                status: 200,
                data: {
                    characters: response.results,
                    pagination: response.meta
                },
                message: 'Characters retrieved successfully'
            };
        } catch (error) {
            throw new APIError('Failed to fetch characters', 500);
        }
    },

    // fetch single character by id from The Office API
    async getById(id) {
        try {
            const character = await apiRequest(`/character/${id}`, {
                baseUrl: API_CONFIG.URLS.OFFICE_API
            });
            return {
                status: 200,
                data: character,
                message: 'Character retrieved successfully'
            };
        } catch (error) {
            throw new APIError('Failed to fetch character', 500);
        }
    }
};