import FrontMatter from "front-matter";
import { Remarkable } from "remarkable";
import { linkify } from "remarkable/linkify";

type MarkdownMeta = Record<string, string | number>;

export class Markdown {
	public static parse(content: string): { meta: MarkdownMeta; content: String } {
		const { attributes, body } = FrontMatter(content);

		return {
			meta: attributes as MarkdownMeta,
			content: new Remarkable("commonmark").use(linkify).render(body).trim(),
		};
	}
}
