import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";

export class PeerData extends DTO.AbstractPeerData implements Contracts.PeerData {
	public ip(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "ip");
	}

	public port(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "port");
	}

	public version(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "version");
	}

	public height(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "height");
	}

	public latency(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "latency");
	}
}
