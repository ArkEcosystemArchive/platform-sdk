import { Builder } from "./builder";
import { SocialMediaItem } from "./contracts";

export class SocialMedia extends Builder {
	public discord(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "discord", value });
	}

	public facebook(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "facebook", value });
	}

	public instagram(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "instagram", value });
	}

	public linkedin(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "linkedin", value });
	}

	public medium(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "medium", value });
	}

	public reddit(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "reddit", value });
	}

	public slack(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "slack", value });
	}

	public telegram(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "telegram", value });
	}

	public twitter(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "twitter", value });
	}

	public youtube(value: string): void {
		this.push<SocialMediaItem>("socialMedia", { type: "youtube", value });
	}
}
