"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = void 0;
const front_matter_1 = __importDefault(require("front-matter"));
const remarkable_1 = require("remarkable");
const linkify_1 = require("remarkable/linkify");
/**
 * A helper to work with CommonMark, Markdown and FrontMatter.
 *
 * @export
 * @class Markdown
 */
class Markdown {
	/**
	 * Parse the given value using the FrontMatter standard.
	 *
	 * @static
	 * @param {string} content
	 * @returns {{ meta: MarkdownMeta; content: String }}
	 * @memberof Markdown
	 */
	static parse(content) {
		const { attributes, body } = front_matter_1.default(content);
		return {
			meta: attributes,
			content: new remarkable_1.Remarkable("commonmark").use(linkify_1.linkify).render(body).trim(),
		};
	}
}
exports.Markdown = Markdown;
//# sourceMappingURL=markdown.js.map
