import { IPeerRepository, IProfile } from "../../../contracts";
import { DataRepository } from "../../../repositories/data-repository";

interface Peer {
	name: string;
	host: string;
	isMultiSignature: boolean;
}

export class PeerRepository implements IPeerRepository {
	//
}
