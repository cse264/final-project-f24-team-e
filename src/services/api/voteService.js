// handles voting operations and vote counts
import { apiRequest } from '../utils/apiUtils';
import { APIError } from '../errors';
import { API_CONFIG } from '../config';

export const voteService = {
    // get all votes with counts
    async getVoteCounts() {
        try {
            const votes = await apiRequest('/votes', {
                baseUrl: API_CONFIG.URLS.LOCAL_API
            });

            // count votes per character
            const voteCounts = votes.reduce((acc, vote) => {
                acc[vote.characterId] = (acc[vote.characterId] || 0) + 1;
                return acc;
            }, {});

            return {
                status: 200,
                data: voteCounts,
                message: 'Vote counts retrieved successfully'
            };
        } catch (error) {
            throw new APIError('Failed to fetch vote counts', 500);
        }
    },

    // remove user's current vote
    async removeVote(userId) {
        try {
          const currentVote = await this.getUserVote(userId);
          if (!currentVote.data) {
            throw new Error('No vote found to remove');
          }

          await apiRequest(`/votes/${currentVote.data.id}`, {
            baseUrl: API_CONFIG.URLS.LOCAL_API,
            method: 'DELETE'
          });

          return {
            status: 200,
            message: 'Vote removed successfully'
          };
        } catch (error) {
          throw new APIError('Failed to remove vote', 500);
        }
    },

    // get user's current vote
    async getUserVote(userId) {
        try {
            const votes = await apiRequest(`/votes?userId=${userId}`, {
                baseUrl: API_CONFIG.URLS.LOCAL_API
            });

            return {
                status: 200,
                data: votes[0] || null,
                message: votes[0] ? 'User vote found' : 'No vote found'
            };
        } catch (error) {
            throw new APIError('Failed to fetch user vote', 500);
        }
    },

    // cast or update a vote
    async vote(userId, characterId) {
        try {
            // check for existing vote
            const existingVote = await this.getUserVote(userId);

            if (existingVote.data) {
                // update existing vote
                const updated = await apiRequest(`/votes/${existingVote.data.id}`, {
                    baseUrl: API_CONFIG.URLS.LOCAL_API,
                    method: 'PUT',
                    body: JSON.stringify({
                        userId,
                        characterId,
                        timestamp: new Date().toISOString()
                    })
                });

                return {
                    status: 200,
                    data: updated,
                    message: 'Vote updated successfully'
                };
            }

            // create new vote
            const created = await apiRequest('/votes', {
                baseUrl: API_CONFIG.URLS.LOCAL_API,
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    characterId,
                    timestamp: new Date().toISOString()
                })
            });

            return {
                status: 201,
                data: created,
                message: 'Vote recorded successfully'
            };
        } catch (error) {
            throw new APIError('Failed to record vote', 500);
        }
    }
};