import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import Cosmos from "ledger-cosmos-js";

export class LedgerService implements Contracts.LedgerService {
	#ledger: Contracts.LedgerTransport;
	#transport!: Cosmos;

	public static async __construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService();
	}

	public async __destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(transport: Contracts.LedgerTransport): Promise<void> {
		this.#ledger = await transport.create();
		this.#transport = new Cosmos(this.#ledger);
	}

	public async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public async getVersion(): Promise<string> {
		const res = await this.#transport.getVersion();

		return `${res.major}.${res.minor}.${res.patch}`;
	}

	public async getPublicKey(path: string): Promise<string> {
		const pathArray: number[] = Object.values(BIP44.parse(path));
		const { compressed_pk } = await this.#transport.publicKey(pathArray);

		return compressed_pk.toString("hex");
	}

	public async getExtendedPublicKey(path: string): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		const pathArray: number[] = Object.values(BIP44.parse(path));
		const { signature } = await this.#transport.sign(pathArray, payload.toString());

		return signature.toString("hex");
	}

	public async signMessage(path: string, payload: Buffer): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "signMessage");
	}

	public async scan(options?: { useLegacy: boolean }): Promise<Contracts.LedgerWalletList> {
		throw new Exceptions.NotImplemented(this.constructor.name, "scan");
	}
}
