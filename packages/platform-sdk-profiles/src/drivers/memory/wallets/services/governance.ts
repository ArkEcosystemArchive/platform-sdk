import { container } from "../../../../environment/container";
import { Identifiers } from "../../../../environment/container.models";
import { IReadWriteWallet, IReadOnlyWallet, WalletData, IDelegateService } from "../../../../contracts";

export class Governance {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	public current(): IReadOnlyWallet[] {
		const votes: string[] | undefined = this.#wallet.data().get<string[]>(WalletData.Votes);

		if (votes === undefined) {
			throw new Error("The voting data has not been synced. Please call [synchroniser().votes()] before accessing votes.");
		}

		return container.get<IDelegateService>(Identifiers.DelegateService).map(this.#wallet, votes);
	}

	public available(): number {
		const result: number | undefined = this.#wallet.data().get<number>(WalletData.VotesAvailable);

		if (result === undefined) {
			throw new Error("The voting data has not been synced. Please call [synchroniser().votes()] before accessing votes.");
		}

		return result;
	}

	public used(): number {
		const result: number | undefined = this.#wallet.data().get<number>(WalletData.VotesUsed);

		if (result === undefined) {
			throw new Error("The voting data has not been synced. Please call [synchroniser().votes()] before accessing votes.");
		}

		return result;
	}
}
