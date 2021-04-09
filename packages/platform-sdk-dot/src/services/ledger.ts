import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { newPolkadotApp } from "@zondax/ledger-polkadot";

export class LedgerService implements Contracts.LedgerService {
	#ledger: Contracts.LedgerTransport;
	#transport;

	public static async __construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService();
	}

	public async __destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(transport: Contracts.LedgerTransport): Promise<void> {
		this.#ledger = await transport.create();
		this.#transport = newPolkadotApp(this.#ledger);
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const { major, minor, patch } = await this.#transport.getVersion();

		return `${major}.${minor}.${patch}`;
	}

	public async getPublicKey(path: string): Promise<string> {
		const parsedPath = this.parseDotPath(path);
		const { pubKey } = await this.#transport.getAddress(parsedPath[2], parsedPath[3], parsedPath[4]);

		return pubKey;
	}

	public async getExtendedPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		const parsedPath = this.parseDotPath(path);
		const { signature } = await this.#transport.sign(parsedPath[2], parsedPath[3], parsedPath[4], payload);

		return signature.toString("hex");
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessage");
	}

	public async scan(options?: { useLegacy: boolean }): Promise<Contracts.LedgerWalletList> {
		throw new Exceptions.NotImplemented(this.constructor.name, "scan");
	}

	private parseDotPath(path: string): number[] {
		const HARDENING = 0x80000000;
		const elements: number[] = [];

		for (const level of path.split("/")) {
			const element = parseInt(level, 10) + (level.endsWith("'") ? HARDENING : 0);
			elements.push(element);
		}

		return elements;
	}
}
