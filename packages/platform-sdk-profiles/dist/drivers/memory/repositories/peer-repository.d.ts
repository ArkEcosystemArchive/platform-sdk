import { IPeer, IPeerRepository, IProfile } from "../../../contracts";
export declare class PeerRepository implements IPeerRepository {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc IPeerRepository.fill} */
	fill(peers: object): void;
	/** {@inheritDoc IPeerRepository.all} */
	all(): Record<string, IPeer>;
	/** {@inheritDoc IPeerRepository.keys} */
	keys(): string[];
	/** {@inheritDoc IPeerRepository.values} */
	values(): IProfile[];
	/** {@inheritDoc IPeerRepository.get} */
	get(coin: string, network: string): IPeer[];
	/** {@inheritDoc IPeerRepository.create} */
	create(coin: string, network: string, peer: IPeer): void;
	/** {@inheritDoc IPeerRepository.has} */
	has(coin: string, network: string): boolean;
	/** {@inheritDoc IPeerRepository.update} */
	update(coin: string, network: string, host: string, peer: IPeer): void;
	/** {@inheritDoc IPeerRepository.forget} */
	forget(coin: string, network: string, peer: IPeer): void;
	/** {@inheritDoc IPeerRepository.toObject} */
	toObject(): Record<string, IPeer>;
	/** {@inheritDoc IPeerRepository.getRelay} */
	getRelay(coin: string, network: string): IPeer | undefined;
	/** {@inheritDoc IPeerRepository.getRelays} */
	getRelays(coin: string, network: string): IPeer[];
	/** {@inheritDoc IPeerRepository.getMultiSignature} */
	getMultiSignature(coin: string, network: string): IPeer | undefined;
}
