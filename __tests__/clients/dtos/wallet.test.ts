import { Wallet } from "../../../src/clients/dtos/wallet";

let subject: Wallet;

beforeEach(() => (subject = new Wallet({ address: "...", publicKey: "..." })));

describe("Wallet", function() {
	it.todo("should ...");
});
