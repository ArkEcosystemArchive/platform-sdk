import "jest-extended";

import { Censor } from "./censor";

let subject: Censor;
beforeEach(() => (subject = new Censor()));

test("#isBad", () => {
	expect(subject.isBad("onion")).toBeTrue();
	expect(subject.isBad("zyva.org")).toBeTrue();
	expect(subject.isBad("tighturl.com")).toBeTrue(); // allow uppercase in code
	expect(subject.isBad("ZYVA.ORG")).toBeTrue(); // allow uppercase in data
	expect(subject.isBad("tree")).toBeFalse();
	expect(subject.isBad("")).toBeFalse();
});

test("#process", () => {
	expect(subject.process("pedo")).toBe("****");
	expect(subject.process("pedophile")).toBe("*********");
	expect(subject.process("zyva.org")).toBe("********");
	expect(subject.process("https://www.google.com/ Don't be an ash0le :smile:")).toBe(
		"*********************** Don't be an ****** :smile:",
	);
	expect(subject.process("tree")).toBe("tree");
	expect(subject.process("")).toBe("");
});
