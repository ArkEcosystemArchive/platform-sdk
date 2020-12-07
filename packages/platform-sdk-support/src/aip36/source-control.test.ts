import { SourceControl } from "./source-control";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new SourceControl(data);
});

it.each([
	"https://bitbucket.org/arkecosystem/workspace/projects/core",
	"https://bitbucket.org/arkecosystem",
	"https://bitbucket.org/ark.ecosystem",
])("should add bitbucket (%s)", (url) => {
	expect(data).toEqual({});

	subject.bitbucket(url);

	expect(data).not.toEqual({});
});

it.each([
	["github", "https://github.com/arkecosystem/core"],
	["github", "https://github.com/arkecosystem"],
	["github", "https://github.com/ark.ecosystem"],
	["gitlab", "https://gitlab.com/arkecosystem/core"],
	["gitlab", "https://gitlab.com/arkecosystem"],
	["gitlab", "https://gitlab.com/ark.ecosystem"],
	["npm", "https://npmjs.com/package/arkecosystem/core"],
	["npm", "https://npmjs.com/package/@arkecosystem/platform-sdk"],
	["npm", "https://npmjs.com/package/arkecosystem"],
])("should accept valid URLs (%s, %s)", (provider, url) => {
	expect(data).toEqual({});

	subject[provider](url);

	expect(data).not.toEqual({});
});
