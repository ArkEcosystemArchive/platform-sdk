export interface RequestOptions {
	prefixUrl?: string;
	headers?: Record<string, string>;
	cache?: object;
	timeout?: number;
	retry?: {
		limit: number,
		maxRetryAfter?: number,
	};
};
