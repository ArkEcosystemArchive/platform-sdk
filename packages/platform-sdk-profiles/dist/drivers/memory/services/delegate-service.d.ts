import { IDelegateService, IProfile, IReadOnlyWallet, IReadWriteWallet } from "../../../contracts";
export declare class DelegateService implements IDelegateService {
	#private;
	/** {@inheritDoc IDelegateService.all} */
	all(coin: string, network: string): IReadOnlyWallet[];
	/** {@inheritDoc IDelegateService.findByAddress} */
	findByAddress(coin: string, network: string, address: string): IReadOnlyWallet;
	/** {@inheritDoc IDelegateService.findByPublicKey} */
	findByPublicKey(coin: string, network: string, publicKey: string): IReadOnlyWallet;
	/** {@inheritDoc IDelegateService.findByUsername} */
	findByUsername(coin: string, network: string, username: string): IReadOnlyWallet;
	/** {@inheritDoc IDelegateService.sync} */
	sync(profile: IProfile, coin: string, network: string): Promise<void>;
	/** {@inheritDoc IDelegateService.syncAll} */
	syncAll(profile: IProfile): Promise<void>;
	/** {@inheritDoc IDelegateService.map} */
	map(wallet: IReadWriteWallet, publicKeys: string[]): IReadOnlyWallet[];
}
