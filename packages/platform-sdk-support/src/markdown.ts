import FrontMatter from "front-matter";
// @ts-ignore - bugged types
import { Remarkable } from "remarkable";

type MarkdownMeta = Record<string, string | number>;

export class Markdown {
	public static parse(content: string): { meta: MarkdownMeta; content: String } {
		const { attributes, body } = FrontMatter(content);

		return {
			meta: attributes as MarkdownMeta,
			content: new Remarkable().render(body).trim(),
		};
	}
}
