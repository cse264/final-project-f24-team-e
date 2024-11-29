import { apiRequest } from '../utils/apiUtils';
import { APIError } from '../errors';

export const characterService = {

    // fetch all characters
    async getAll() {
        try {
            const characters = await apiRequest('/characters', {
                baseUrl: API_CONFIG.URLS.OFFICE_API
            });
            return {
                status: 200,
                data: characters,
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