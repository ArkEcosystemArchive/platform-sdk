import { PeerData } from "./peer";
import Fixture from "../../test/fixtures/client/peers.json";

let subject: PeerData;

beforeEach(() => (subject = new PeerData(Fixture.data[0])));

describe("PeerData", function () {
	test("#ip", () => {
		expect(subject.ip()).toBe("217.182.72.43");
	});

	test("#port", () => {
		expect(subject.port()).toBe(5001);
	});

	test("#version", () => {
		expect(subject.version()).toBe("3.0.0-beta.0");
	});

	test("#height", () => {
		expect(subject.height()).toBe(377747);
	});

	test("#latency", () => {
		expect(subject.latency()).toBe(-1);
	});
});
