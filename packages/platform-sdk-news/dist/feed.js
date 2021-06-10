"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _FeedService_parser;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
/**
 * Implements the ability to retrieve any RSS Feed and parse it.
 *
 * @export
 * @class FeedService
 */
class FeedService {
	/**
	 * Creates an instance of FeedService.
	 *
	 * @memberof FeedService
	 */
	constructor() {
		/**
		 * The RSS Feed parser.
		 *
		 * @type {RssParser}
		 * @memberof FeedService
		 */
		_FeedService_parser.set(this, void 0);
		__classPrivateFieldSet(this, _FeedService_parser, new rss_parser_1.default(), "f");
	}
	/**
	 * Retrieves an RSS Feed and parses it according to specifications.
	 *
	 * @param {string} url
	 * @returns {Promise<RssParser.Output<any>>}
	 * @memberof FeedService
	 */
	async parse(url) {
		return __classPrivateFieldGet(this, _FeedService_parser, "f").parseURL(url);
	}
	/**
	 * Retrieves an RSS Feed and returns all items.
	 *
	 * @param {string} url
	 * @returns {(Promise<RssParser.Item[] | undefined>)}
	 * @memberof FeedService
	 */
	async items(url) {
		const { items } = await this.parse(url);
		return items;
	}
}
exports.FeedService = FeedService;
_FeedService_parser = new WeakMap();
//# sourceMappingURL=feed.js.map
