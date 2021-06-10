import "jest-extended";

import { Markdown } from "./markdown";

test("#parse", () => {
	expect(
		Markdown.parse(`---
title: Just hack'n
description: Nothing to see here
---

# Remarkable rulezz!`),
	).toEqual({
		meta: {
			description: "Nothing to see here",
			title: "Just hack'n",
		},
		content: "<h1>Remarkable rulezz!</h1>",
	});
});
