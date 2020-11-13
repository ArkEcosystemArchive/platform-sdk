import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "./wallet";

let subject: WalletData;

describe("WalletData", function () {
	describe.each(["mainnet", "devnet"])("%s", (network) => {
		beforeEach(() => {
			subject = new WalletData(
				{
					mainnet: {
						address: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
						publicKey: "03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
						nonce: "111932",
						balance: "55827093444556",
						isDelegate: true,
						isResigned: true,
						vote: "03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
						username: "arkx",
					},
					devnet: {
						address: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
						publicKey: "03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
						nonce: "111932",
						balance: "55827093444556",
						attributes: {
							delegate: {
								username: "arkx",
								voteBalance: "57037342430760",
								forgedFees: "124364463486",
								forgedRewards: "16899000000000",
								producedBlocks: 84709,
								lastBlock: {
									id: "682a1c53eb9e6fcf285d1b6819de08f88bd15b083a612c3fe32aa870001dbf22",
									height: 4269235,
									timestamp: 91907944,
									generatorPublicKey:
										"03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
								},
								resigned: true,
							},
							vote: "03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
						},
					},
				}[network],
			);
		});

		test("#address", () => {
			expect(subject.address()).toBe("DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9");
		});

		test("#publicKey", () => {
			expect(subject.publicKey()).toBe("03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec");
		});

		test("#balance", () => {
			expect(subject.balance()).toEqual(BigNumber.make("55827093444556"));
		});

		test("#isDelegate", () => {
			expect(subject.isDelegate()).toBeTrue();
		});

		test("#isResignedDelegate", () => {
			expect(subject.isResignedDelegate()).toBeTrue();
		});

		test("#isKnown", () => {
			expect(subject.isKnown()).toBeFalse();
		});

		test("#isMultiSignature", () => {
			expect(subject.isMultiSignature()).toBeFalse();
		});

		test("#isSecondSignature", () => {
			expect(subject.isSecondSignature()).toBeFalse();
		});

		test("#toObject", () => {
			expect(subject.toObject()).toBeObject();
		});
	});
});
