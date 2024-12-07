// custom error for api-related failures
export class APIError extends Error {
    constructor(message, status, data = null) {
      super(message);
      this.name = 'APIError';
      this.status = status;
      this.data = data;
      this.timestamp = new Date().toISOString();
    }
}

// custom error for data validation failures
export class ValidationError extends Error {
    constructor(message, validationErrors = {}) {
        super(message);
        this.name = 'ValidationError';
        this.validationErrors = validationErrors;
        this.timestamp = new Date().toISOString();
    }
}