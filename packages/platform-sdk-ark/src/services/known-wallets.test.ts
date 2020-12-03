import "jest-extended";

import { createConfig } from "../../test/helpers";
import { KnownWalletService } from "./known-wallets";

let subject: KnownWalletService;

beforeEach(async () => {
	subject = await KnownWalletService.construct(createConfig());
});

describe("KnownWalletService", () => {
	it.todo("should return a list of known wallets if the request succeeds");
	it.todo("should fail to return a list of known wallets if the request fails");
});
