import { DTO } from "@arkecosystem/platform-sdk";

export class PeerData extends DTO.PeerData {
	public getIp(): string {
		return this.data.ip;
	}

	public getPort(): number {
		return this.data.port;
	}

	public getVersion(): string {
		return this.data.version;
	}

	public getHeight(): number {
		return this.data.height;
	}

	public getLatency(): number {
		return this.data.latency;
	}
}
