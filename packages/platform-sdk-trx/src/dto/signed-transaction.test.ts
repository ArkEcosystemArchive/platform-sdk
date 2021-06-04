import "jest-extended";

import { Test } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";

import { SignedTransactionData } from "./signed-transaction";
import { container } from "../container";

let subject: SignedTransactionData;

beforeEach(() => {
	subject = new SignedTransactionData(
		"214e690d9a630013826a5ad002c254740028ae3b8f4230949fd04148e3d26b42",
		{
			visible: false,
			txID: "214e690d9a630013826a5ad002c254740028ae3b8f4230949fd04148e3d26b42",
			raw_data: {
				contract: [
					{
						parameter: {
							value: {
								amount: 1000000,
								owner_address: "410971d4dec6c12a9b4df09cbad2e42c063084860a",
								to_address: "41359a9ff5b9cd7c752e56194586e85f2fe24401fa",
							},
							type_url: "type.googleapis.com/protocol.TransferContract",
						},
						type: "TransferContract",
					},
				],
				ref_block_bytes: "a1b9",
				ref_block_hash: "dd59919999e7c481",
				expiration: 1620877881000,
				timestamp: 1620877822246,
			},
			raw_data_hex:
				"0a02a1b92208dd59919999e7c48140a8dde69e962f5a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a15410971d4dec6c12a9b4df09cbad2e42c063084860a121541359a9ff5b9cd7c752e56194586e85f2fe24401fa18c0843d70a692e39e962f",
			signature: [
				"87c7efb2be02e64019ecfda21021a7fac4b0664e0f67eaa64b6bed8e26315eb3e215660ecb1659d647094decdc2221fecbf0fbbf2de78c8f6b2fdc729e4953a401",
			],
		},
		"",
	);

	Test.bindBigNumberService(container);
});

describe("SignedTransactionData", () => {
	test("#timestamp", () => {
		expect(DateTime.make(1620877822246).isSame(subject.timestamp())).toBeTrue();
	});

	test("#amount", () => {
		expect(subject.amount().toNumber()).toBe(1_000_000);
	});
});
