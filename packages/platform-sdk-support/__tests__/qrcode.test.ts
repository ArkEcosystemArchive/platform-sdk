/**
 * @jest-environment jsdom
 */

import "jest-extended";

import { QRCode } from "../src/qrcode";

test("#fromString", () => {
	expect(QRCode.fromString("https://github.com/neocotic/qrious")).toBeInstanceOf(QRCode);
});

test("#fromObject", () => {
	expect(QRCode.fromObject({ url: "https://github.com/neocotic/qrious" })).toBeInstanceOf(QRCode);
});

test("#toDataURL", () => {
	expect(QRCode.fromString("https://github.com/neocotic/qrious").toDataURL()).toStartWith("data:image/png;base64,");
});
