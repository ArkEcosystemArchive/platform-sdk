import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Xrp from "@ledgerhq/hw-app-xrp";
import LedgerTransport from "@ledgerhq/hw-transport-node-hid-singleton";

export class LedgerService implements Contracts.LedgerService {
	readonly #ledger: LedgerTransport;
	readonly #transport: Xrp;

	private constructor(transport: Contracts.LedgerTransport) {
		this.#ledger = transport;
		this.#transport = new Xrp(transport);
	}

	public static async construct(opts: Contracts.LedgerOptions): Promise<LedgerService> {
		return new LedgerService(opts.transport);
	}

	public async destruct(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		return await this.#transport.getAppConfiguration().then((result) => {
			return result.version;
		});
	}

	public async getPublicKey(path: string): Promise<string> {
		return await this.#transport.getAddress(path).then((result) => {
			return result.publicKey;
		});
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		return await this.#transport.signTransaction(path, payload);
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
