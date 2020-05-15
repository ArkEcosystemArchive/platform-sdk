import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import LedgerTransport from "@ledgerhq/hw-transport-node-hid-singleton";
import Ledger from "ledger-cosmos-js";

export class LedgerService implements Contracts.LedgerService {
	readonly #ledger: LedgerTransport;
	readonly #transport: Ledger;

	private constructor(transport: Contracts.LedgerTransport) {
		this.#ledger = transport;
		this.#transport = new Ledger(transport);
	}

	public static async construct(opts: Contracts.LedgerOptions): Promise<LedgerService> {
		return new LedgerService(opts.transport || (await LedgerTransport.create()));
	}

	public async destruct(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const { appVersion } = await this.#transport.appInfo();

		return appVersion;
	}

	public async getPublicKey(path: string): Promise<string> {
		const { compressed_pk } = await this.#transport.publicKey(path);

		return compressed_pk.toString("hex");
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		return this.#transport.sign(path, payload);
	}

	public async signTransactionWithSchnorr(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signTransactionWithSchnorr");
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessage");
	}

	public async signMessageWithSchnorr(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessageWithSchnorr");
	}
}
