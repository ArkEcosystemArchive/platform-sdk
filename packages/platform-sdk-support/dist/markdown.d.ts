declare type MarkdownMeta = Record<string, string | number>;
/**
 * A helper to work with CommonMark, Markdown and FrontMatter.
 *
 * @export
 * @class Markdown
 */
export declare class Markdown {
	/**
	 * Parse the given value using the FrontMatter standard.
	 *
	 * @static
	 * @param {string} content
	 * @returns {{ meta: MarkdownMeta; content: String }}
	 * @memberof Markdown
	 */
	static parse(
		content: string,
	): {
		meta: MarkdownMeta;
		content: String;
	};
}
export {};
