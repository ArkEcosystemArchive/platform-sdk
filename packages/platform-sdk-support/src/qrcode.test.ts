import "jest-extended";

import { QRCode } from "./qrcode";

test("#fromString", () => {
	expect(QRCode.fromString("https://google.com")).toBeInstanceOf(QRCode);
});

test("#fromObject", () => {
	expect(QRCode.fromObject({ url: "https://google.com" })).toBeInstanceOf(QRCode);
});

test("#toDataURL", async () => {
	const actual: string = await QRCode.fromString("https://google.com").toDataURL();

	expect(actual).toStartWith("data:image/png;base64,");
	expect(actual).toMatchSnapshot();
});

test("#toDataURL with options", async () => {
	const actual: string = await QRCode.fromString("https://google.com").toDataURL({ width: 250, margin: 0 });

	expect(actual).toStartWith("data:image/png;base64,");
	expect(actual).toMatchSnapshot();
});

describe.each(["utf8", "svg", "terminal"])("%s", (type) => {
	it("should turn into a data URL", async () => {
		await expect(QRCode.fromString("https://google.com").toDataURL()).resolves.toMatchSnapshot();
	});

	it("should turn into a string", async () => {
		// @ts-ignore
		await expect(QRCode.fromString("https://google.com").toString(type)).resolves.toMatchSnapshot();
	});
});

it("should turn into a utf-8 string if no argument is given", async () => {
	await expect(QRCode.fromString("https://google.com").toString()).resolves.toMatchSnapshot();
});
