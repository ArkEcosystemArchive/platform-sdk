import { IReadWriteWallet, IReadOnlyWallet } from "../../../../contracts";
import { IVoteRegistry } from "../../../../contracts/wallets/services/vote-registry";
export declare class VoteRegistry implements IVoteRegistry {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc IVoteRegistry.current} */
	current(): IReadOnlyWallet[];
	/** {@inheritDoc IVoteRegistry.available} */
	available(): number;
	/** {@inheritDoc IVoteRegistry.used} */
	used(): number;
}
