import "jest-extended";

import { AbstractPeerData } from "./peer";

test("#toObject", () => {
	expect(new Peer({ key: "value" }).toObject()).toMatchInlineSnapshot(`
		Object {
		  "height": 5000,
		  "ip": "127.0.0.1",
		  "latency": 23,
		  "port": 4003,
		  "version": "3.0.6",
		}
	`);
});

test("#raw", () => {
	expect(new Peer({ key: "value" }).raw()).toMatchInlineSnapshot(`
		Object {
		  "key": "value",
		}
	`);
});

test("#hasPassed", () => {
	expect(new Peer({ key: "value" }).hasPassed()).toBeTrue();
	expect(new Peer({}).hasPassed()).toBeFalse();
});

test("#hasFailed", () => {
	expect(new Peer({}).hasFailed()).toBeTrue();
	expect(new Peer({ key: "value" }).hasFailed()).toBeFalse();
});

class Peer extends AbstractPeerData {
	public ip(): string {
		return "127.0.0.1";
	}

	public port(): number {
		return 4003;
	}

	public version(): string {
		return "3.0.0";
	}

	public height(): number {
		return 5000;
	}

	public latency(): number {
		return 23;
	}
}
