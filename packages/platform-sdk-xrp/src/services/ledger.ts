import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Ripple from "@ledgerhq/hw-app-xrp";
import LedgerTransport from "@ledgerhq/hw-transport-node-hid-singleton";

export class LedgerService implements Contracts.LedgerService {
	readonly #ledger: LedgerTransport;
	readonly #transport: Ripple;

	private constructor(transport: Contracts.LedgerTransport) {
		this.#ledger = transport;
		this.#transport = new Ripple(transport);
	}

	public static async construct(opts: Contracts.LedgerOptions): Promise<LedgerService> {
		return new LedgerService(opts.transport || (await LedgerTransport.create()));
	}

	public async destruct(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const { version } = await this.#transport.getAppConfiguration();

		return version;
	}

	public async getPublicKey(path: string): Promise<string> {
		const { publicKey } = await this.#transport.getAddress(path);

		return publicKey;
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		return this.#transport.signTransaction(path, payload);
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
