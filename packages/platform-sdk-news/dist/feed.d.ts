import RssParser from "rss-parser";
/**
 * Implements the ability to retrieve any RSS Feed and parse it.
 *
 * @export
 * @class FeedService
 */
export declare class FeedService {
	#private;
	/**
	 * Creates an instance of FeedService.
	 *
	 * @memberof FeedService
	 */
	constructor();
	/**
	 * Retrieves an RSS Feed and parses it according to specifications.
	 *
	 * @param {string} url
	 * @returns {Promise<RssParser.Output<any>>}
	 * @memberof FeedService
	 */
	parse(url: string): Promise<RssParser.Output<any>>;
	/**
	 * Retrieves an RSS Feed and returns all items.
	 *
	 * @param {string} url
	 * @returns {(Promise<RssParser.Item[] | undefined>)}
	 * @memberof FeedService
	 */
	items(url: string): Promise<RssParser.Item[] | undefined>;
}
