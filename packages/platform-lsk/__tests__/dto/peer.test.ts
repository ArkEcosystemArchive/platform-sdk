import { PeerData } from "../../src/dto";
import Fixture from "../__fixtures__/client/getPeers.json";

let subject: PeerData;

beforeEach(() => (subject = new PeerData(Fixture.data[0])));

describe("PeerData", function () {
	test("#getIp", () => {
		expect(subject.getIp()).toBe("217.182.72.43");
	});

	test("#getPort", () => {
		expect(subject.getPort()).toBe(5001);
	});

	test("#getVersion", () => {
		expect(subject.getVersion()).toBe("3.0.0-beta.0");
	});

	test("#getHeight", () => {
		expect(subject.getHeight()).toBe(377747);
	});

	test("#getLatency", () => {
		expect(subject.getLatency()).toBe(-1);
	});
});
