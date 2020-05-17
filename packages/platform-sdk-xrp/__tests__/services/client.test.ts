import "jest-extended";
import WebSocket from "ws";
import { Utils } from "@arkecosystem/platform-sdk";

import fixtures from "./fixtures/rippled";

import { ClientService } from "../../src/services/client";
import { WalletData, TransactionData } from "../../src/dto";
import { createConfig } from "../helpers";

let subject: ClientService;
let wss;
let receivedSubmit;

jest.setTimeout(30000);

beforeAll(async () => {
	wss = new WebSocket.Server({ port: 51233 });

	wss.on("connection", function connection(ws) {
		ws.on("message", function incoming(message) {
			// console.log(`RECEIVED: ${message}`);

			const { id, command } = JSON.parse(message);

			if (command === "subscribe") {
				ws.send(
					JSON.stringify({
						...fixtures.subscribe,
						...{ id },
					}),
				);
			}

			if (command === "tx") {
				ws.send(
					JSON.stringify({
						...fixtures.tx.Payment,
						...{ id },
					}),
				);
			}

			if (command === "account_tx") {
				ws.send(
					fixtures.account_tx.normal({
						id,
					}),
				);
			}

			if (command === "account_info") {
				ws.send(
					JSON.stringify({
						...fixtures.account_info.normal,
						...{ id },
					}),
				);
			}

			if (command === "submit") {
				if (receivedSubmit) {
					ws.send(
						JSON.stringify({
							...fixtures.submit.failure,
							...{ id },
						}),
					);
				} else {
					receivedSubmit = true;

					ws.send(
						JSON.stringify({
							...fixtures.submit.success,
							...{ id },
						}),
					);
				}
			}
		});
	});

	subject = await ClientService.construct(createConfig());
});

afterAll(() => wss.close());

describe("ClientService", function () {
	describe("#transaction", () => {
		it("should succeed", async () => {
			const result = await subject.transaction(
				"F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF",
			);

			expect(result).toBeInstanceOf(TransactionData);
			expect(result.id()).toBe("F4AB442A6D4CBB935D66E1DA7309A5FC71C7143ED4049053EC14E3875B0CF9BF");
			expect(result.type()).toBe("transfer");
			expect(result.timestamp()).toBe(1363132610000);
			expect(result.confirmations()).toEqual(Utils.BigNumber.ZERO);
			expect(result.sender()).toBe("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
			expect(result.recipient()).toBe("rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM");
			expect(result.amount()).toEqual(Utils.BigNumber.make(100000));
			expect(result.fee()).toEqual(Utils.BigNumber.make(1000));
			expect(result.memo()).toBeUndefined();
		});
	});

	describe("#transactions", () => {
		it("should succeed", async () => {
			const result = await subject.transactions({
				address: "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
				limit: 10,
			});

			expect(result.data).toBeArray();
			expect(result.data[0]).toBeInstanceOf(TransactionData);
			expect(result.data[0].id()).toBe("99404A34E8170319521223A6C604AF48B9F1E3000C377E6141F9A1BF60B0B865");
			expect(result.data[0].type()).toBe("transfer");
			expect(result.data[0].timestamp()).toBeUndefined();
			expect(result.data[0].confirmations()).toEqual(Utils.BigNumber.ZERO);
			expect(result.data[0].sender()).toBe("r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59");
			expect(result.data[0].recipient()).toBe("rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM");
			expect(result.data[0].amount()).toEqual(Utils.BigNumber.make(100000));
			expect(result.data[0].fee()).toEqual(Utils.BigNumber.make(1000));
			expect(result.data[0].memo()).toBeUndefined();
		});
	});

	describe("#wallet", () => {
		it("should succeed", async () => {
			const result = await subject.wallet("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");

			expect(result).toBeInstanceOf(WalletData);
			expect(result.address()).toEqual("rMWnHRpSWTYSsxbDjASvGvC31F4pRkyYHP");
			// expect(result.publicKey()).toBeUndefined();
			expect(result.balance()).toEqual(Utils.BigNumber.make("92291324300"));
		});
	});

	describe("#broadcast", () => {
		const transactionPayload =
			"12000322000000002400000017201B0086955468400000000000000C732102F89EAEC7667B30F33D0687BBA86C3FE2A08CCA40A9186C5BDE2DAA6FA97A37D87446304402207660BDEF67105CE1EBA9AD35DC7156BAB43FF1D47633199EE257D70B6B9AAFBF02207F5517BC8AEF2ADC1325897ECDBA8C673838048BCA62F4E98B252F19BE88796D770A726970706C652E636F6D81144FBFF73DA4ECF9B701940F27341FA8020C313443";

		it("should pass", async () => {
			const result = await subject.broadcast([transactionPayload]);

			expect(result).toEqual({
				accepted: ["4D5D90890F8D49519E4151938601EF3D0B30B16CD6A519D9C99102C9FA77F7E0"],
				rejected: [],
				errors: {},
			});
		});

		it("should fail", async () => {
			const result = await subject.broadcast([transactionPayload]);

			expect(result).toEqual({
				accepted: [],
				rejected: [transactionPayload],
				errors: {
					[transactionPayload]: ["ERR_BAD_FEE"],
				},
			});
		});
	});
});
