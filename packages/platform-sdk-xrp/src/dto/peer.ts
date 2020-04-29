import { DTO, Exceptions } from "@arkecosystem/platform-sdk";

export class PeerData extends DTO.PeerData {
	public getIp(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getIp");
	}

	public getPort(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPort");
	}

	public getVersion(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getVersion");
	}

	public getHeight(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getHeight");
	}

	public getLatency(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getLatency");
	}
}
