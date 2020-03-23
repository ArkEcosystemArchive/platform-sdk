import { Ethereum } from "../../../src/crypto/adapters/eth";

let subject: Ethereum;

beforeEach(() => (subject = new Ethereum('devnet')));

describe("Ethereum", function() {
	it.todo("should ...");
});
