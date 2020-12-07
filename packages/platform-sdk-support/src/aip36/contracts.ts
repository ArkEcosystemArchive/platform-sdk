export interface ImageItem {
	type: "logo" | "image";
	value: string;
}

export interface SocialMediaItem {
	type:
		| "discord"
		| "facebook"
		| "instagram"
		| "linkedin"
		| "medium"
		| "reddit"
		| "slack"
		| "telegram"
		| "twitter"
		| "wechat"
		| "youtube";
	value: string;
}

export interface SourceControlItem {
	type: "bitbucket" | "github" | "gitlab" | "npm";
	value: string;
}

export interface VideoItem {
	type: "video";
	value: string;
}
