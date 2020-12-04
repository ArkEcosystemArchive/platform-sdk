import "jest-extended";

import { Link } from "./link";

test("#ipfs", () => {
	expect(Link.ipfs("id")).toBe("https://gateway.ipfs.io/ipfs/id");
});

test("#pinata", () => {
	expect(Link.pinata("id")).toBe("https://gateway.pinata.cloud/ipfs/id");
});

test("#cloudflare", () => {
	expect(Link.cloudflare("id")).toBe("https://cloudflare-ipfs.com/ipfs/id");
});
