import { ensureTrailingSlash } from "./urls";

test("#ensureTrailingSlash", () => {
	expect(ensureTrailingSlash("#")).toBe("#/");
	expect(ensureTrailingSlash("/")).toBe("/");
});
