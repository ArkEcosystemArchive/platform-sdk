import { Builder } from "./builder";
import { ImageItem, VideoItem } from "./contracts";

export class Media extends Builder {
	public logo(value: string): void {
		this.push<ImageItem>("images", { type: "logo", value });
	}

	public image(value: string): void {
		this.push<ImageItem>("images", { type: "image", value });
	}

	public video(value: string): void {
		this.push<VideoItem>("videos", { type: "video", value });
	}
}
