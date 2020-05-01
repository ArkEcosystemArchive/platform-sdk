import { Contracts, DTO } from "@arkecosystem/platform-sdk";

export class PeerData extends DTO.AbstractPeerData implements Contracts.PeerData {
	public ip(): string {
		return this.data.ip;
	}

	public port(): number {
		return this.data.wsPort;
	}

	public version(): string {
		return this.data.version;
	}

	public height(): number {
		return this.data.height;
	}

	public latency(): number {
		return -1;
	}
}
