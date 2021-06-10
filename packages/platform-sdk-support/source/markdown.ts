import FrontMatter from "front-matter";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

type MarkdownMeta = Record<string, string | number>;

/**
 * A helper to work with CommonMark, Markdown and FrontMatter.
 *
 * @export
 * @class Markdown
 */
export class Markdown {
	/**
	 * Parse the given value using the FrontMatter standard.
	 *
	 * @static
	 * @param {string} content
	 * @returns {{ meta: MarkdownMeta; content: String }}
	 * @memberof Markdown
	 */
	public static parse(content: string): { meta: MarkdownMeta; content: String } {
		const { attributes, body } = FrontMatter(content);

		return {
			meta: attributes as MarkdownMeta,
			content: new Remarkable("commonmark").use(linkify).render(body).trim(),
		};
	}
}
