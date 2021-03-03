import RssParser from "rss-parser";

export class FeedService {
	readonly #parser: RssParser;

	public constructor() {
		this.#parser = new RssParser();
	}

	public async parse(url: string): Promise<RssParser.Output<any>> {
		return this.#parser.parseURL(url);
	}

	public async items(url: string): Promise<RssParser.Item[] | undefined> {
		const { items } = await this.parse(url);

		return items;
	}
}
