import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { RippleAPI } from "ripple-lib";

import { IdentityService } from "./identity";

export class TransactionService implements Contracts.TransactionService {
			readonly #connection: RippleAPI;

			private constructor(connection: RippleAPI) {
				this.#connection = connection;
			}

			public static async construct(config: Coins.Config): Promise<TransactionService> {
				let connection: RippleAPI;
				try {
					connection = new RippleAPI({ server: config.get<string>("peer") });
				} catch {
					connection = new RippleAPI({
						server: Arr.randomElement(config.get<Coins.CoinNetwork>("network").hosts),
					});
				}

				await connection.connect();

				return new TransactionService(connection);
			}

			public async destruct(): Promise<void> {
				//
			}

			public async transfer(
				input: Contracts.TransferInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				const sender: string = await new IdentityService().address().fromPassphrase(input.sign.passphrase);

				const prepared = await this.#connection.preparePayment(
					sender,
					{
						source: {
							address: sender,
							maxAmount: {
								value: `${input.data.amount}`,
								currency: "XRP",
							},
						},
						destination: {
							address: input.data.to,
							amount: {
								value: `${input.data.amount}`,
								currency: "XRP",
							},
						},
					},
					{ maxLedgerVersionOffset: 5 },
				);

				const { signedTransaction } = this.#connection.sign(
					prepared.txJSON,
					BIP39.normalize(input.sign.passphrase),
				);

				return signedTransaction;
			}

			public async secondSignature(
				input: Contracts.SecondSignatureInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
			}

			public async delegateRegistration(
				input: Contracts.DelegateRegistrationInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
			}

			public async vote(
				input: Contracts.VoteInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "vote");
			}

			public async multiSignature(
				input: Contracts.MultiSignatureInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
			}

			public async ipfs(
				input: Contracts.IpfsInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
			}

			public async multiPayment(
				input: Contracts.MultiPaymentInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
			}

			public async delegateResignation(
				input: Contracts.DelegateResignationInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
			}

			public async htlcLock(
				input: Contracts.HtlcLockInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
			}

			public async htlcClaim(
				input: Contracts.HtlcClaimInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
			}

			public async htlcRefund(
				input: Contracts.HtlcRefundInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
			}

			public async businessRegistration(
				input: Contracts.BusinessRegistrationInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "businessRegistration");
			}

			public async businessResignation(
				input: Contracts.BusinessResignationInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "businessResignation");
			}

			public async businessUpdate(
				input: Contracts.BusinessUpdateInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "businessUpdate");
			}

			public async bridgechainRegistration(
				input: Contracts.BridgechainRegistrationInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "bridgechainRegistration");
			}

			public async bridgechainResignation(
				input: Contracts.BridgechainResignationInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "bridgechainResignation");
			}

			public async bridgechainUpdate(
				input: Contracts.BridgechainUpdateInput,
				options?: Contracts.TransactionOptions,
			): Promise<Contracts.SignedTransaction> {
				throw new Exceptions.NotImplemented(this.constructor.name, "bridgechainUpdate");
			}
		}
