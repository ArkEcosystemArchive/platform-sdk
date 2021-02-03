import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
// @ts-ignore
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';
import { waitReady } from "@polkadot/wasm-crypto";
import {
    createMetadata,
    createSignedTx,
    createSigningPayload,
    decode,
    deriveAddress,
    getRegistry,
    getTxHash,
    methods,
    POLKADOT_SS58_FORMAT,
// @ts-ignore
} from "@substrate/txwrapper";

import { SignedTransactionData } from "../dto/signed-transaction";

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

        const alice = this.#keyring.addFromUri('//Alice', { name: 'Alice' }, 'sr25519');
        console.log(
            "Alice's SS58-Encoded Address:",
            deriveAddress(alice.publicKey, POLKADOT_SS58_FORMAT)
        );

        // Construct a balance transfer transaction offline.
        // To construct the tx, we need some up-to-date information from the node.
        // `txwrapper` is offline-only, so does not care how you retrieve this info.
        // In this tutorial, we simply send RPC requests to the node.
        const { block } = await this.#client.rpc.chain.getBlock();
        const blockHash = await this.#client.rpc.chain.getBlockHash();
        const genesisHash = await this.#client.rpc.chain.getBlockHash(0);
        const metadataRpc = await this.#client.rpc.state.getMetadata();
        const { specVersion, transactionVersion } = await this.#client.rpc.state.getRuntimeVersion();

        // Create Polkadot's type registry.
        const registry = getRegistry('Polkadot', 'polkadot', specVersion);

        // Now we can create our `balances.transfer` unsigned tx. The following
        // function takes the above data as arguments, so can be performed offline
        // if desired.
        const unsigned = methods.balances.transfer(
            {
            value: '90071992547409910',
            dest: '14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3', // Bob
            },
            {
            address: deriveAddress(alice.publicKey, POLKADOT_SS58_FORMAT),
            blockHash,
            blockNumber: registry
                .createType('BlockNumber', block.header.number)
                .toNumber(),
            eraPeriod: 64,
            genesisHash,
            metadataRpc,
            nonce: 0, // Assuming this is Alice's first tx on the chain
            specVersion,
            tip: 0,
            transactionVersion,
            },
            {
            metadataRpc,
            registry,
            }
        );

        // Decode an unsigned transaction.
        const decodedUnsigned = decode(
            unsigned,
            {
            metadataRpc,
            registry,
            },
            true
        );
        console.log(
            `\nDecoded Transaction\n  To: ${decodedUnsigned.method.args.dest}\n` +
            `  Amount: ${decodedUnsigned.method.args.value}`
        );

        // Construct the signing payload from an unsigned transaction.
        const signingPayload = createSigningPayload(unsigned, { registry });
        console.log(`\nPayload to Sign: ${signingPayload}`);

        // Decode the information from a signing payload.
        const payloadInfo = decode(
            signingPayload,
            {
            metadataRpc,
            registry,
            },
            true
        );
        console.log(
            `\nDecoded Transaction\n  To: ${payloadInfo.method.args.dest}\n` +
            `  Amount: ${payloadInfo.method.args.value}`
        );

		// Important! The registry needs to be updated with latest metadata, so make
		// sure to run `registry.setMetadata(metadata)` before signing.
		registry.setMetadata(createMetadata(registry, metadataRpc));

        // Sign a payload. This operation should be performed on an offline device.
		const { signature } = registry
		  .createType('ExtrinsicPayload', signingPayload, {
			version: EXTRINSIC_VERSION,
		  })
		  .sign(alice);

        console.log(`\nSignature: ${signature}`);

        // Serialize a signed transaction.
        const tx = createSignedTx(unsigned, signature, { metadataRpc, registry });
        console.log(`\nTransaction to Submit: ${tx}`);

        // Derive the tx hash of a signed transaction offline.
        const expectedTxHash = getTxHash(tx);
        console.log(`\nExpected Tx Hash: ${expectedTxHash}`);

        // Send the tx to the node. Again, since `txwrapper` is offline-only, this
        // operation should be handled externally. Here, we just send a JSONRPC
        // request directly to the node.
        const actualTxHash = await this.#client.rpc.author.submitAndWatchExtrinsic(tx);
        console.log(`Actual Tx Hash: ${actualTxHash}`);

        // Decode a signed payload.
        const txInfo = decode(
            tx,
            {
            metadataRpc,
            registry,
            },
            true
        );
        console.log(
            `\nDecoded Transaction\n  To: ${txInfo.method.args.dest}\n` +
            `  Amount: ${txInfo.method.args.value}\n`
        );

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
