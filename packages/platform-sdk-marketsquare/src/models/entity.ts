import { AIP36 } from "../resources/aip36";

export interface Entity {
	id: number;
	name: string;
	display_name: string;
	slug: string;
	description: string;
	excerpt: string;
	avatar: string;
	is_claimed: boolean;
	is_featured: boolean;
	is_grant: boolean;
	is_hidden: boolean;
	is_indexable: boolean;
	is_official: boolean;
	is_promoted: boolean;
	is_resigned: boolean;
	is_verified: boolean;
	registered_at: string;
	created_at: string;
	updated_at: string;
	identity: {
		address: string;
		public_key: string;
	};
	aip36?: {
		id: string;
		type: string;
		subtype: string;
	};
	ipfs?: {
		hash: string;
		data: AIP36;
	};
}

export interface PackageEntity {
	npm: {
		version: string;
		downloads: number;
		last_updated_at: string;
	};
	manifest: {
		categories: string[];
		permissions: string[];
		urls: string[];
		minVersion: string;
	};
}
