import { abort_if, abort_unless } from "../distribution";

test("#abort_if", () => {
	expect(() => abort_if(false, "Hello")).not.toThrow();
	expect(() => abort_if(true, "Hello")).toThrow(/Hello/);
});

test("#abort_unless", () => {
	expect(() => abort_unless(true, "Hello")).not.toThrow();
	expect(() => abort_unless(false, "Hello")).toThrow(/Hello/);
});
