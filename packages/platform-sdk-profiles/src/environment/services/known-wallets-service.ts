import { DataRepository } from "../../repositories/data-repository";
import { KnownWallet } from "../env.models";

export class KnownWalletsService {
	readonly #data: DataRepository = new DataRepository();

	public constructor(knownWallets: KnownWallet[] = []) {
		knownWallets.forEach((knownWallet) => {
			this.#data.set(knownWallet.address, knownWallet);
		});
	}

	public findByAddress(address: string): KnownWallet | undefined {
		return this.#data.get(address);
	}

	public isKnown(address: string): boolean {
		return !!this.#data.get(address);
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
