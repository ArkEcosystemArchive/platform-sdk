import RssParser from "rss-parser";

/**
 * Implements the ability to retrieve any RSS Feed and parse it.
 *
 * @export
 * @class FeedService
 */
export class FeedService {
	/**
	 * The RSS Feed parser.
	 *
	 * @type {RssParser}
	 * @memberof FeedService
	 */
	readonly #parser: RssParser;

	/**
	 * Creates an instance of FeedService.
	 *
	 * @memberof FeedService
	 */
	public constructor() {
		this.#parser = new RssParser();
	}

	/**
	 * Retrieves an RSS Feed and parses it according to specifications.
	 *
	 * @param {string} url
	 * @returns {Promise<RssParser.Output<any>>}
	 * @memberof FeedService
	 */
	public async parse(url: string): Promise<RssParser.Output<any>> {
		return this.#parser.parseURL(url);
	}

	/**
	 * Retrieves an RSS Feed and returns all items.
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
