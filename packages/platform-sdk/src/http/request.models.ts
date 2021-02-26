export interface RequestOptions {
	prefixUrl?: string;
	method?: string;
	headers?: Record<string, string>;
	cache?: object;
	timeout?: number;
	retry?: {
		limit: number,
		maxRetryAfter?: number,
	};
	// Payload
	params?: object;
	searchParams?: any;
	body?: any;
	json?: any;
};
