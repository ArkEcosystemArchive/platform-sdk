import { ensureTrailingSlash } from "./helpers";

test("#ensureTrailingSlash", () => {
	expect(ensureTrailingSlash("#")).toBe("#/");
	expect(ensureTrailingSlash("/")).toBe("/");
});
