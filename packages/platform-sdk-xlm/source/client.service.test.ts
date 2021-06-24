import "jest-extended";

import { DTO, IoC, Services, Signatories } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";

import { identity } from "../test/fixtures/identity";
import { createService } from "../test/mocking";
import { TransferData } from "./transfer.dto";
import { WalletData } from "./wallet.dto";
import { DataTransferObjects } from "./coin.dtos";
import { ClientService } from "./client.service";
import { KeyPairService } from "./key-pair.service";
import { TransactionService } from "./transaction.service";

let subject: ClientService;

beforeAll(() => {
	nock.disableNetConnect();

	subject = createService(ClientService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
		container.singleton(IoC.BindingType.DataTransferObjectService, Services.AbstractDataTransferObjectService);
	});
});

afterEach(() => nock.cleanAll());

beforeAll(() => {
	nock.disableNetConnect();
});

describe("ClientService", () => {
	describe("#transaction", () => {
		it("should succeed", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/transactions/264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c")
				.query(true)
				.reply(200, require(`${__dirname}/../test/fixtures/client/transaction.json`))
				.get("/transactions/264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c/operations")
				.query(true)
				.reply(200, require(`${__dirname}/../test/fixtures/client/transaction-operations.json`));

			const result = await subject.transaction(
				"264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c",
			);

			expect(result).toBeInstanceOf(TransferData);
			expect(result.id()).toBe("264226cb06af3b86299031884175155e67a02e0a8ad0b3ab3a88b409a8c09d5c");
			expect(result.type()).toBe("transfer");
			expect(result.timestamp()).toBeInstanceOf(DateTime);
			// expect(result.confirmations()).toEqual(BigNumber.make(159414));
			expect(result.sender()).toBe("GAHXEI3BVFOBDHWLC4TJKCGTLY6VMTKMRRWWPKNPPULUC7E3PD63ENKO");
			expect(result.recipient()).toBe("GB2V4J7WTTKLIN5O3QPUAQCOLLIIULJM3FHHAQ7GEQ5EH53BXXQ47HU3");
			expect(result.amount()).toEqual(BigNumber.make("100000000"));
			expect(result.fee()).toEqual(BigNumber.make("10000000000"));
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(result.memo()).toBeUndefined();
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GAHXEI3BVFOBDHWLC4TJKCGTLY6VMTKMRRWWPKNPPULUC7E3PD63ENKO/payments")
				.query(true)
				.reply(200, require(`${__dirname}/../test/fixtures/client/transactions.json`));

			const response = await subject.transactions({
				address: "GAHXEI3BVFOBDHWLC4TJKCGTLY6VMTKMRRWWPKNPPULUC7E3PD63ENKO",
			});

			expect(response).toBeObject();
			expect(response.items()[0]).toBeInstanceOf(TransferData);
			expect(response.items()[0].id()).toBe("7cea6abe90654578b42ee696e823187d89d91daa157a1077b542ee7c77413ce3");
			expect(response.items()[0].type()).toBe("transfer");
			expect(response.items()[0].timestamp()).toBeInstanceOf(DateTime);
			// expect(response.items()[0].confirmations()).toEqual(BigNumber.make(159414));
			expect(response.items()[0].sender()).toBe("GAGLYFZJMN5HEULSTH5CIGPOPAVUYPG5YSWIYDJMAPIECYEBPM2TA3QR");
			expect(response.items()[0].recipient()).toBe("GBYUUJHG6F4EPJGNLERINATVQLNDOFRUD7SGJZ26YZLG5PAYLG7XUSGF");
			expect(response.items()[0].amount()).toEqual(BigNumber.make("100000000000000"));
			// expect(response.items()[0].fee()).toEqual(BigNumber.make("10000000000"));
			// @ts-ignore - Better types so that memo gets detected on TransactionDataType
			expect(response.items()[0].memo()).toBeUndefined();
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB")
				.query(true)
				.reply(200, require(`${__dirname}/../test/fixtures/client/wallet.json`));

			const result = await subject.wallet("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toBe("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");
			expect(result.publicKey()).toBe("GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB");
			expect(result.balance().available).toEqual(BigNumber.make("100000000000000"));
			expect(result.nonce()).toEqual(BigNumber.make("7275146318446606"));
		});
	});

	describe("#broadcast", () => {
		it("should pass", async () => {
			nock("https://horizon-testnet.stellar.org")
				.get("/accounts/GCGYSPQBSQCJKNDXDISBSXAM3THK7MACUVZGEMXF6XRZCPGAWCUGXVNC")
				.query(true)
				.reply(200, require(`${__dirname}/../test/fixtures/client/wallet.json`))
				.persist();

			nock("https://horizon-testnet.stellar.org")
				.post("/transactions")
				.reply(200, require(`${__dirname}/../test/fixtures/client/broadcast.json`));

			const transactionService = createService(TransactionService, undefined, (container: IoC.Container) => {
				container.constant(IoC.BindingType.Container, container);
				container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
				container.singleton(
					IoC.BindingType.DataTransferObjectService,
					Services.AbstractDataTransferObjectService,
				);
				container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
			});

			const result = await subject.broadcast([
				await transactionService.transfer({
					signatory: new Signatories.Signatory(
						new Signatories.MnemonicSignatory({
							signingKey: identity.mnemonic,
							address: identity.address,
							publicKey: identity.publicKey,
							privateKey: identity.privateKey,
						}),
					),
					data: {
						amount: 1,
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
				.reply(200, require(`${__dirname}/../test/fixtures/client/wallet.json`))
				.persist();

			nock("https://horizon-testnet.stellar.org")
				.post("/transactions")
				.reply(400, require(`${__dirname}/../test/fixtures/client/broadcast-failure.json`));

			const transactionService = createService(TransactionService, undefined, (container: IoC.Container) => {
				container.constant(IoC.BindingType.Container, container);
				container.constant(IoC.BindingType.DataTransferObjects, DataTransferObjects);
				container.singleton(
					IoC.BindingType.DataTransferObjectService,
					Services.AbstractDataTransferObjectService,
				);
				container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
			});

			const result = await subject.broadcast([
				await transactionService.transfer({
					signatory: new Signatories.Signatory(
						new Signatories.MnemonicSignatory({
							signingKey: identity.mnemonic,
							address: identity.address,
							publicKey: identity.publicKey,
							privateKey: identity.privateKey,
						}),
					),
					data: {
						amount: 1,
						to: identity.address,
					},
				}),
			]);

			expect(result.accepted).toMatchObject([]);
			expect(result.rejected[0]).toBeString();
			expect(result.errors[result.rejected[0]]).toBe("op_underfunded");
		});
	});
});
