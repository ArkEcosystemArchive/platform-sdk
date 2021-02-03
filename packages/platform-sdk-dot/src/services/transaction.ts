import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
// @ts-ignore
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';
import { waitReady } from "@polkadot/wasm-crypto";

import { SignedTransactionData } from "../dto/signed-transaction";
import {
    createSignedTx,
    createSigningPayload,
    deriveAddress,
    getRegistry,
    getTxHash,
    methods,
    POLKADOT_SS58_FORMAT,
} from "../crypto";
import { createMetadata } from "../crypto/util";

export class TransactionService implements Contracts.TransactionService {
	readonly #client: ApiPromise;
	readonly #keyring: Keyring;

	public constructor(client: ApiPromise) {
		this.#client = client;
		this.#keyring = new Keyring({ type: "sr25519" });
	}

	public static async construct(config: Coins.Config): Promise<TransactionService> {
		await waitReady();

		const wsProvider = new WsProvider(Arr.randomElement(config.get<string[]>("network.networking.hosts")));
		const api = await ApiPromise.create({ provider: wsProvider });

		await api.isReady;

		return new TransactionService(api);
	}

	public async destruct(): Promise<void> {
		await this.#client.disconnect();
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.sign.mnemonic === undefined) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "transfer");
        }

		// Create the signatory wallet
        const signatory = this.#keyring.addFromMnemonic(input.sign.mnemonic);

		// Gather the required network state
        const { block } = await this.#client.rpc.chain.getBlock();
        const blockHash = await this.#client.rpc.chain.getBlockHash();
        const genesisHash = await this.#client.rpc.chain.getBlockHash(0);
        const metadataRpc = await this.#client.rpc.state.getMetadata();
        const { specVersion, transactionVersion } = await this.#client.rpc.state.getRuntimeVersion();

        // Create Polkadot's type registry.
			// @ts-ignore
        const registry = getRegistry('Polkadot', 'polkadot', specVersion);

        // Create a `balances.transfer` unsigned tx
        const unsigned = methods.balances.transfer({
			value: input.data.amount,
			dest: input.data.to,
		}, {
			address: deriveAddress(signatory.publicKey, POLKADOT_SS58_FORMAT),
			// @ts-ignore
			blockHash,
			// @ts-ignore
			blockNumber: registry.createType('BlockNumber', block.header.number).toNumber(),
			// @ts-ignore
			eraPeriod: 64,
			// @ts-ignore
			genesisHash,
			// @ts-ignore
			metadataRpc,
			nonce: 0, // Assuming this is Alice's first tx on the chain
			// @ts-ignore
			specVersion,
			// @ts-ignore
			tip: 0,
			// @ts-ignore
			transactionVersion,
		}, {
			metadataRpc,
			// @ts-ignore
			registry,
		});

        // Construct the signing payload from an unsigned transaction
        const signingPayload = createSigningPayload(unsigned, { registry });
        console.log(`\nPayload to Sign: ${signingPayload}`);

		// Important! The registry needs to be updated with latest metadata, so make
		// sure to run `registry.setMetadata(metadata)` before signing.
		// @ts-ignore
		registry.setMetadata(createMetadata(registry, metadataRpc));

        // Sign a payload. This operation should be performed on an offline device.
		const { signature } = registry
			.createType("ExtrinsicPayload", signingPayload, { version: EXTRINSIC_VERSION })
			.sign(signatory);

        console.log(`\nSignature: ${signature}`);

        // Serialize a signed transaction.
			// @ts-ignore
        const tx = createSignedTx(unsigned, signature, { metadataRpc, registry });
        console.log(`\nTransaction to Submit: ${tx}`);

        // Derive the tx hash of a signed transaction offline.
        const expectedTxHash = getTxHash(tx);
        console.log(`\nExpected Tx Hash: ${expectedTxHash}`);

        // Send the tx to the node. Again, since `txwrapper` is offline-only, this
        // operation should be handled externally. Here, we just send a JSONRPC
        // request directly to the node.
			// @ts-ignore
        const actualTxHash = await this.#client.rpc.author.submitAndWatchExtrinsic(tx);
        console.log(`Actual Tx Hash: ${actualTxHash}`);

		// const keypair = this.#keyring.addFromUri(input.sign.mnemonic);
		// const transfer = this.#client.tx.balances.transfer(input.data.to, input.data.amount);
		// const transaction = await transfer.signAsync(keypair);

        // return new SignedTransactionData(transaction.hash.toHex(), JSON.parse(transaction.toString()));

		return new SignedTransactionData("aaa", {});
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public async multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}
}
