import "jest-extended";

import Fixture from "../test/fixtures/client/cryptoConfiguration.json";
import { createService } from "../test/mocking";
import { DelegateResignationData } from "./delegate-resignation.dto";

let subject: DelegateResignationData;

beforeEach(() => {
	subject = createService(DelegateResignationData);
	Fixture.data.genesisBlock.transactions[1].type = 7;
	subject.configure(Fixture.data.genesisBlock.transactions[1]);
});

describe("DelegateResignationData", () => {
	test("#type", () => {
		expect(subject.type()).toBe("delegateResignation");
	});
});
