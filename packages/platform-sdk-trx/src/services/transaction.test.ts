import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../../test/identity";
import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => (subject = await TransactionService.__construct(createConfig())));

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", function () {
	test("#transfer", async () => {
		nock("https://api.shasta.trongrid.io")
			.post("/wallet/createtransaction")
			.reply(200, require(`${__dirname}/../../test/fixtures/crypto/transfer.json`))
			.post("/wallet/broadcasttransaction")
			.reply(200, {"result":true,"txid":"920048e37005eb84299fe99ae666dcfe220a5befa587eec9c36c9e75dc37f821"});

		const result = await subject.transfer({
			from: identity.address,
			sign: {
				mnemonic: identity.mnemonic,
			},
			data: {
				to: "TEre3kN6JdPzqCNpiZT8JWM4kt8iGrg1Rm",
				amount: "1",
			},
		});

		expect(result).toBeObject();
	});
});
