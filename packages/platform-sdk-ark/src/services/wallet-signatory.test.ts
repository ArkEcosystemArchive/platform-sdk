import "jest-extended";

import { createConfigWithNetwork } from "../../test/helpers";
import { WalletDiscoveryService } from "./wallet-discovery";

describe("WalletDiscoveryService", () => {
	it("should construct with an empty configuration", async () => {
		const subject = await WalletDiscoveryService.__construct(createConfigWithNetwork());

		expect(subject).toBeInstanceOf(WalletDiscoveryService);
	});
});