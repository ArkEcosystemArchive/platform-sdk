import { SocialMedia } from "./social-media";

let data;
let subject;

beforeEach(() => {
	data = {};
	subject = new SocialMedia(data);
});

it.each([
	["discord", "https://discord.com/invite/VNRfxwQ"],
	["discord", "https://discord.gg/invite/VNRfxwQ"],
	["discord", "https://discord.gg/ps1h6QT"],
	["facebook", "https://facebook.com/arkecosystem"],
	["facebook", "https://facebook.com/ark.ecosystem"],
	["facebook", "http://facebook.com/ark"],
	["instagram", "https://instagram.com/arkecosystem"],
	["instagram", "https://instagram.com/ark.ecosystem"],
	["instagram", "http://instagram.com/ark"],
	["linkedin", "https://linkedin.com/in/arkecosystem"],
	["linkedin", "https://linkedin.com/in/ark.ecosystem"],
	["linkedin", "http://linkedin.com/in/ark"],
	["linkedin", "http://linkedin.com/company/ark/"],
	["medium", "https://medium.com/@arkecosystem"],
	["reddit", "https://reddit.com/r/arkecosystem"],
	["reddit", "https://reddit.com/r/ArkEcosystem/"],
	["reddit", "https://reddit.com/user/ark1"],
	["slack", "https://arkecosystem.slack.com"],
	["telegram", "https://t.me/arkannouncements"],
	["telegram", "https://telegram.me/arkannouncements"],
	["telegram", "https://telegram.org/ark123"],
	["twitter", "https://twitter.com/arkecosystem"],
	["twitter", "https://twitter.com/@arkecosystem"],
	["twitter", "https://twitter.com/@ark_ecosystem"],
	["youtube", "https://www.youtube.com/channel/UCpc2k6zOOutGT9y56urDClg"],
	["youtube", "https://youtube.com/channel/UCpc2k6zOOutGT9y56urDClg"],
	["youtube", "http://youtube.com/channel/UCpc2k6zOOutGT9y56urDClg"],
	["youtube", "https://www.youtube.com/user/UCpc2k6zOOutGT9y56urDClg"],
])("should accept valid URLs (%s, %s)", (provider, url) => {
	expect(data).toEqual({});

	subject[provider](url);

	expect(data).not.toEqual({});
});
