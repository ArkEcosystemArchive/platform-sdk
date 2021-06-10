import { IKnownWalletService, IProfile } from "../../../contracts";
export declare class KnownWalletService implements IKnownWalletService {
	#private;
	/** {@inheritDoc IKnownWalletService.syncAll} */
	syncAll(profile: IProfile): Promise<void>;
	/** {@inheritDoc IKnownWalletService.network} */
	name(network: string, address: string): string | undefined;
	/** {@inheritDoc IKnownWalletService.network} */
	is(network: string, address: string): boolean;
	/** {@inheritDoc IKnownWalletService.network} */
	isExchange(network: string, address: string): boolean;
	/** {@inheritDoc IKnownWalletService.network} */
	isTeam(network: string, address: string): boolean;
}
