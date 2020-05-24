import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-support";
import LedgerTransport from "@ledgerhq/hw-transport-node-hid-singleton";
import CosmosApp from "ledger-cosmos-js";

export class LedgerService implements Contracts.LedgerService {
	#ledger: LedgerTransport;
	#transport: CosmosApp;

	private constructor(transport: Contracts.LedgerTransport) {
		this.#ledger = transport;
	}

	public static async construct(config: Coins.Config): Promise<LedgerService> {
		try {
			return new LedgerService(config.get("services.ledger.transport"));
		} catch {
			return new LedgerService(LedgerTransport);
		}
	}

	public async destruct(): Promise<void> {
		await this.disconnect();
	}

	public async connect(): Promise<void> {
		this.#ledger = await this.#ledger.create();
		this.#transport = new CosmosApp(this.#ledger);
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

	public async signTransaction(path: string, payload: Buffer): Promise<string> {
		const pathArray: number[] = Object.values(BIP44.parse(path));
		const { signature } = await this.#transport.sign(pathArray, payload.toString());

		return signature.toString("hex");
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
