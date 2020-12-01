import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class KnownWalletsService implements Contracts.KnownWalletsService {
	public static async construct(config: Coins.Config): Promise<KnownWalletsService> {
		return new KnownWalletsService();
	}

	public async destruct(): Promise<void> {}

	public findByAddress(address: string): Contracts.KnownWallet | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "findByAddress");
	}

	public isKnown(address: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isKnown");
	}

	public hasType(address: string, type: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "hasType");
	}

	public isOwnedByExchange(address: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isOwnedByExchange");
	}

	public isOwnedByTeam(address: string): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isOwnedByTeam");
	}

	public displayName(address: string): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "displayName");
	}
}
