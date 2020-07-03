import "jest-extended";

import Fixture from "../../test/fixtures/client/peers.json";
import { PeerData } from "./peer";

let subject: PeerData;

beforeEach(() => (subject = new PeerData(Fixture.data[0])));

describe("PeerData", function () {
	test("#ip", () => {
		expect(subject.ip()).toBe("51.89.73.41");
	});

	test("#port", () => {
		expect(subject.port()).toBe(4002);
	});

	test("#version", () => {
		expect(subject.version()).toBe("2.6.12-next.15");
	});

	test("#height", () => {
		expect(subject.height()).toBe(4670251);
	});

	test("#latency", () => {
		expect(subject.latency()).toBe(13);
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture.data[0]);
	});
});
