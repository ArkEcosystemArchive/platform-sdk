export interface BlockfolioSignal {
	id: number;
	text: string;
	links: string[];
	category: string;
	author: { title: string; name: string; team: string };
	is_featured: boolean;
	created_at: string;
	updated_at: string;
}

export interface BlockfolioResponse {
	data: BlockfolioSignal[];
	meta: {
		current_page: number;
		from: number;
		last_page: number;
		path: string;
		per_page: number;
		to: number;
		total: number;
	};
}
