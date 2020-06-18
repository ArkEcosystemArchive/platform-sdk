import "jest-extended";

import { QRCode } from "../src/qrcode";

test("#fromString", () => {
	expect(QRCode.fromString("https://github.com/neocotic/qrious")).toBeInstanceOf(QRCode);
});

test("#fromObject", () => {
	expect(QRCode.fromObject({ url: "https://github.com/neocotic/qrious" })).toBeInstanceOf(QRCode);
});

test("#toDataURL", async () => {
	const actual: string = await QRCode.fromString("https://github.com/neocotic/qrious").toDataURL();

	expect(actual).toStartWith("data:image/png;base64,");
	expect(actual).toMatchSnapshot();
});

describe.each(["utf8", "svg", "terminal"])("%s", (type) => {
	it("should turn into a string", async () => {
		await expect(QRCode.fromString("https://github.com/neocotic/qrious").toString(type as any)).resolves.toMatchSnapshot();
	});
});
