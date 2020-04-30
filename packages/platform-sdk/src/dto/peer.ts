import { KeyValuePair } from "../contracts/types";

export abstract class AbstractPeerData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract getIp(): string;

	abstract getPort(): number;

	abstract getVersion(): string;

	abstract getHeight(): number;

	abstract getLatency(): number;

	public toObject(): KeyValuePair {
		return {
			ip: this.getIp(),
			port: this.getPort(),
			version: this.getVersion(),
			height: this.getHeight(),
			latency: this.getLatency(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}
}
