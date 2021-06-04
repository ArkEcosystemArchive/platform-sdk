import "jest-extended";

import { createConfigWithNetwork } from "../../test/helpers";
import { SignatoryService } from "./signatory";

describe("SignatoryService", () => {
	it("should construct with an empty configuration", async () => {
		const subject = await SignatoryService.__construct(createConfigWithNetwork());

		expect(subject).toBeInstanceOf(SignatoryService);
	});
});