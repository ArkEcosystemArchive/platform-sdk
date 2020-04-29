import { Peer } from "../../src/dto";
import Fixture from "../__fixtures__/client/getPeers.json";

let subject: Peer;

beforeEach(() => (subject = new Peer(Fixture.data[0])));

describe("Ark", function () {
	test("#getIp", () => {
		expect(subject.getIp()).toBe("51.89.73.41");
	});

	test("#getPort", () => {
		expect(subject.getPort()).toBe(4002);
	});

	test("#getVersion", () => {
		expect(subject.getVersion()).toBe("2.6.12-next.15");
	});

	test("#getHeight", () => {
		expect(subject.getHeight()).toBe(4670251);
	});

	test("#getLatency", () => {
		expect(subject.getLatency()).toBe(13);
	});
});
