import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class KnownWalletsService implements Contracts.KnownWalletsService {
	readonly #knownWallets: Record<string, Contracts.KnownWallet>;

	private constructor(config: Coins.Config) {
		const knownWallets = [...config.get<Contracts.KnownWallet[]>("network.knownWallets")];
		this.#knownWallets = {};

		for (const knownWallet of knownWallets) {
			this.#knownWallets[knownWallet.address] = knownWallet;
		}
	}

	public static async construct(config: Coins.Config): Promise<KnownWalletsService> {
		return new KnownWalletsService(config);
	}

	public async destruct(): Promise<void> {}

	public findByAddress(address: string): Contracts.KnownWallet | undefined {
		return this.#knownWallets[address];
	}

	public isKnown(address: string): boolean {
		return !!this.findByAddress(address);
	}

	public hasType(address: string, type: string): boolean {
		const addressData = this.findByAddress(address);
		return addressData?.type === type;
	}

	public isOwnedByExchange(address: string): boolean {
		return this.hasType(address, "exchange");
	}

	public isOwnedByTeam(address: string): boolean {
		return this.hasType(address, "team");
	}

	public displayName(address: string): string | undefined {
		const addressData = this.findByAddress(address);
		return addressData?.name;
	}
}
