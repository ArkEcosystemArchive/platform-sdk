export interface Response<T> {
	data: T;
}

export interface PaginatedResponse<T> extends Response<T> {
	data: T;
	links: Links;
	meta: Meta;
}

// Pagination
export interface Links {
	first: string;
	last: string;
	prev?: any;
	next: string;
}

export interface Link {
	url: string;
	label: any;
	active: boolean;
}

export interface Meta {
	current_page: number;
	from: number;
	last_page: number;
	links: Link[];
	path: string;
	per_page: number;
	to: number;
	total: number;
}
