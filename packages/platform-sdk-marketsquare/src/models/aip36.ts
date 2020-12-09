interface SourceControl {
	type: string;
	value: string;
}

interface SocialMedia {
	type: string;
	value: string;
}

interface Image {
	type: string;
	value: string;
}

interface Video {
	type: string;
	value: string;
}

interface Percentage {
	min: number;
	max: number;
}

interface Frequency {
	type: string;
	value: number;
}

interface Distribution {
	min: number;
	max: number;
}

interface Delegate {
	type: string;
	percentage: Percentage;
	frequency: Frequency;
}

interface Meta {
	displayName?: string;
	description?: string;
	excerpt?: string;
	website?: string;
	seeds?: string[];
	delegate?: Delegate;
}

export interface AIP36 {
	sourceControl: SourceControl[];
	socialMedia: SocialMedia[];
	images: Image[];
	videos: Video[];
	meta: Meta;
}
