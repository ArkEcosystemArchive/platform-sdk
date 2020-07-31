import { KeyValuePair } from "../contracts/types";

export abstract class AbstractPeerData {
	public constructor(protected readonly data: KeyValuePair) {}

	abstract ip(): string;

	abstract port(): number;

	abstract version(): string;

	abstract height(): number;

	abstract latency(): number;

	public toObject(): KeyValuePair {
		return {
			ip: this.ip(),
			port: this.port(),
			version: this.version(),
			height: this.height(),
			latency: this.latency(),
		};
	}

	public raw(): KeyValuePair {
		return this.data;
	}

	public hasPassed(): boolean {
		return Boolean(this.data);
	}

	public hasFailed(): boolean {
		return !this.hasPassed();
	}
}
