export interface RegistryPluginManifest {
	categories: string[];
	permissions: string[];
	urls: any[];
	minVersion: string;
}

export interface RegistryPluginSourceControl {
	type: string;
	value: string;
}

export interface RegistryPluginSocialMedia {
	type: string;
	value: string;
}

export interface RegistryPluginImage {
	type: string;
	value: string;
}

export interface RegistryPluginMeta {
	displayName?: string;
	description?: string;
}

export interface RegistryPluginAip36 {
	sourceControl?: RegistryPluginSourceControl[];
	socialMedia?: RegistryPluginSocialMedia[];
	images?: RegistryPluginImage[];
	meta?: RegistryPluginMeta;
}

export interface RegistryPluginVersion {
	id: number;
	name: string;
	released_at: Date;
	is_verified: boolean;
}

export interface RegistryPlugin {
	id: number;
	type: string;
	name: string;
	slug: string;
	description: string;
	version: string;
	downloads: number;
	manifest: RegistryPluginManifest;
	aip36: RegistryPluginAip36;
	versions: RegistryPluginVersion[];
	updated_at: Date;
}

export interface RegistryPluginResponse {
	data: RegistryPlugin;
}

export interface RegistryPluginListResponse {
	data: RegistryPlugin[];
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
