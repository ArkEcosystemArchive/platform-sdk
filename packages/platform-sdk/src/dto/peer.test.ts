import "jest-extended";

import { AbstractPeerData } from "./peer"

test('#toObject', () => {
	expect(new Peer({ key: "value" }).toObject()).toEqual({
		ip: '127.0.0.1',
		port: 4003,
		version: '3.0.0',
		height: 5000,
		latency: 23,
	});
});

test('#raw', () => {
	expect(new Peer({ key: "value" }).raw()).toEqual({ key: "value" });
});

test('#hasPassed', () => {
	expect(new Peer({ key: "value" }).hasPassed()).toBeTrue();
	expect(new Peer({}).hasPassed()).toBeFalse();
});

test('#hasFailed', () => {
	expect(new Peer({}).hasFailed()).toBeTrue();
	expect(new Peer({ key: "value" }).hasFailed()).toBeFalse();
});

class Peer extends AbstractPeerData {
	public ip(): string {
		return '127.0.0.1';
	}

	public port(): number {
		return 4003;
	}

	public version(): string {
		return '3.0.0';
	}

	public height(): number {
		return 5000;
	}

	public latency(): number {
		return 23;
	}
}
