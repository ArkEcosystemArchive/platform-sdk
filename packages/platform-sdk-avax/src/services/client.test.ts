import { createConfig } from "../../test/helpers";
import { WalletData } from "../dto";
import { ClientService } from "./client";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.__construct(createConfig())));

describe("ClientService", function () {
	describe("#wallet", () => {
		it("should succeed", async () => {
			const result = await subject.wallet("X-fuji1my5kqjufcshudkzu4xdt5rlqk99j9nwseclkwq");

			expect(result).toBeInstanceOf(WalletData);
		});
	});
});
