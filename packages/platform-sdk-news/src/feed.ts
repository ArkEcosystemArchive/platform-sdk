import RssParser from "rss-parser";

/**
 *
 *
 * @export
 * @class FeedService
 */
export class FeedService {
	/**
	 *
	 *
	 * @type {RssParser}
	 * @memberof FeedService
	 */
	readonly #parser: RssParser;

	/**
	 *Creates an instance of FeedService.
	 * @memberof FeedService
	 */
	public constructor() {
		this.#parser = new RssParser();
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @returns {Promise<RssParser.Output<any>>}
	 * @memberof FeedService
	 */
	public async parse(url: string): Promise<RssParser.Output<any>> {
		return this.#parser.parseURL(url);
	}

	/**
	 *
	 *
	 * @param {string} url
	 * @returns {(Promise<RssParser.Item[] | undefined>)}
	 * @memberof FeedService
	 */
	public async items(url: string): Promise<RssParser.Item[] | undefined> {
		const { items } = await this.parse(url);

		return items;
	}
}
