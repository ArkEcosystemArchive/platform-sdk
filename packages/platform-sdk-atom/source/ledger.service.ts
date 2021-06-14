import { IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import Cosmos from "ledger-cosmos-js";

@IoC.injectable()
export class LedgerService extends Services.AbstractLedgerService {
	#ledger: Services.LedgerTransport;
	#transport!: Cosmos;

	public override async connect(transport: Services.LedgerTransport): Promise<void> {
		this.#ledger = await transport.create();
		this.#transport = new Cosmos(this.#ledger);
	}

	public override async disconnect(): Promise<void> {
		await this.#ledger.close();
	}

	public override async getVersion(): Promise<string> {
		const res = await this.#transport.getVersion();

		return `${res.major}.${res.minor}.${res.patch}`;
	}

	public override async getPublicKey(path: string): Promise<string> {
		const pathArray: number[] = Object.values(BIP44.parse(path));
		const { compressed_pk } = await this.#transport.publicKey(pathArray);

		return compressed_pk.toString("hex");
	}

	public override async signTransaction(path: string, payload: Buffer): Promise<string> {
		const pathArray: number[] = Object.values(BIP44.parse(path));
		const { signature } = await this.#transport.sign(pathArray, payload.toString());

		return signature.toString("hex");
	}
}
