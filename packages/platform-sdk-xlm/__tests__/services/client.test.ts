import "jest-extended";
import { Utils } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { ClientService } from "../../src/services/client";
import { TransactionService } from "../../src/services/transaction";
import { TransactionData, WalletData } from "../../src/dto";
import { identity } from "../__fixtures__/identity";
import { createConfig } from "../helpers";

let subject: ClientService;

beforeEach(async () => (subject = await ClientService.construct(createConfig())));

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/transactions/264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c")
				.query(true)
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction.json`))
				.get("/transactions/264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c/operations")
				.query(true)
				.reply(200, require(`${__dirname}/../__fixtures__/client/transaction-operations.json`));

			const result = await subject.transaction(
				"264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c");
			expect(result.type()).toBe("transfer");
			expect(result.timestamp()).toBe(1554840865000);
			// expect(result.confirmations()).toEqual(BigNumber.make(159414));
			expect(result.sender()).toBe("GAHXEI3BVFOBDHWLC4TJKCGTLY6VMTKMRRWWPKNPPULUC7E3PD63ENKO");
			expect(result.recipient()).toBe("GB2V4J7WTTKLIN5O3QPUAQCOLLIIULJM3FHHAQ7GEQ5EH53BXXQ47HU3");
			expect(result.amount()).toEqual(BigNumber.make("100000000"));
			expect(result.fee()).toEqual(BigNumber.make("10000000000"));
			expect(result.memo()).toBeUndefined();
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GAHXEI3BVFOBDHWLC4TJKCGTLY6VMTKMRRWWPKNPPULUC7E3PD63ENKO/transactions")
				.query(true)
				.reply(200, require(`${__dirname}/../__fixtures__/client/transactions.json`));

			const { data } = await subject.transactions({
				address: "GAHXEI3BVFOBDHWLC4TJKCGTLY6VMTKMRRWWPKNPPULUC7E3PD63ENKO",
			});

			expect(data).toBeObject();
			expect(data.first()).toBeInstanceOf(TransactionData);
			expect(data.first().id()).toBe("7cea6abe90654578b42ee696e823187d89d91daa157a1077b542ee7c77413ce3");
			expect(data.first().type()).toBe("transfer");
			expect(data.first().timestamp()).toBe(1554505662000);
			// expect(data.first().confirmations()).toEqual(BigNumber.make(159414));
			expect(data.first().sender()).toBe("GAGLYFZJMN5HEULSTH5CIGPOPAVUYPG5YSWIYDJMAPIECYEBPM2TA3QR");
			expect(data.first().recipient()).toBe("GBYUUJHG6F4EPJGNLERINATVQLNDOFRUD7SGJZ26YZLG5PAYLG7XUSGF");
			expect(data.first().amount()).toEqual(BigNumber.make("100000000000000"));
			// expect(data.first().fee()).toEqual(BigNumber.make("10000000000"));
			expect(data.first().memo()).toBeUndefined();
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB")
				.query(true)
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`));

			const result = await subject.wallet("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");
			expect(result.publicKey()).toBe("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");
			expect(result.balance()).toEqual(BigNumber.make("100000000000000"));
			expect(result.nonce()).toEqual(BigNumber.make("7275146318446606"));
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC")
				.query(true)
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`))
				.persist();

			nock("https://horizon-testnet.stellar.org")
				.post("/transactions")
				.reply(200, require(`${__dirname}/../__fixtures__/client/broadcast.json`));

			const transactionService = await TransactionService.construct(createConfig());

			const result = await subject.broadcast([
				await transactionService.transfer({
					sign: {
						passphrase: identity.passphrase,
					},
					data: {
						amount: "10000000",
						to: identity.address,
					},
				}),
			]);

			expect(result).toEqual({
				accepted: ["54600f7b16c2c061ff2d3c96fad6e719039eba94618346717d7dc912c40466e0"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC")
				.query(true)
				.reply(200, require(`${__dirname}/../__fixtures__/client/wallet.json`))
				.persist();

			nock("https://horizon-testnet.stellar.org")
				.post("/transactions")
				.reply(400, require(`${__dirname}/../__fixtures__/client/broadcast-failure.json`));

			const transactionService = await TransactionService.construct(createConfig());

			const result = await subject.broadcast([
				await transactionService.transfer({
					sign: {
						passphrase: identity.passphrase,
					},
					data: {
						amount: "10000000",
						to: identity.address,
					},
				}),
			]);

			const fakeId =
				"AAAAAA9yI2GpXBGeyxcmlQjTXj1WTUyMbWepr30XQXybeP2yAAAAZAADEzQAAAAFAAAAAQAAAAAAAAAAAAAAAF66HwoAAAAAAAAAAQAAAAAAAAABAAAAAHVeJ/ac1LQ3rtwfQEBOWtCKLSzZTnBD5iQ6Q/dhveHPAAAAAAAAWvMQekAAAAAAAAAAAAGbeP2yAAAAQBiWYaTm27ZWFOCYpIljljVEK24tVewGm2YtcsUVWGgeZ5VrtXzI5dYizy4/T1T/R1nKb4TItHxj+4th0/9NmQw=";

			expect(result).toEqual({
				accepted: [],
				rejected: [fakeId],
				errors: {
					[fakeId]: ["ERR_INSUFFICIENT_FUNDS"],
				},
			});
		});
	});
});
