import "jest-extended";

import { identity } from "../../../test/fixtures/identity";
import { ReadOnlyWallet } from "./read-only-wallet";

let subject: ReadOnlyWallet;

beforeEach(async () => {
	subject = new ReadOnlyWallet({
		address: identity.address,
		publicKey: identity.publicKey,
		username: "arkx",
		rank: 1,
		explorerLink: "https://google.com",
		isDelegate: false,
		isResignedDelegate: false,
	});
});

it("should have an address", () => {
	expect(subject.address()).toEqual(identity.address);
});

it("should have a publicKey", () => {
	expect(subject.publicKey()).toEqual(identity.publicKey);
});

it("should have an username", () => {
	expect(subject.username()).toEqual("arkx");
});

it("should have an avatar", () => {
	expect(subject.avatar()).toMatchInlineSnapshot(
		`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"picasso\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"50\\" cx=\\"60\\" cy=\\"40\\" fill=\\"rgb(139, 195, 74)\\"/><circle r=\\"45\\" cx=\\"0\\" cy=\\"30\\" fill=\\"rgb(0, 188, 212)\\"/><circle r=\\"40\\" cx=\\"90\\" cy=\\"50\\" fill=\\"rgb(255, 193, 7)\\"/></svg>"`,
	);
});

it("should have an explorer link", () => {
	expect(subject.explorerLink()).toEqual("https://google.com");
});
