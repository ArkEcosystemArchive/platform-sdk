import { Bitcoin } from "../../../src/crypto/adapters/btc";

let subject: Bitcoin;

beforeEach(() => (subject = new Bitcoin('devnet')));

describe("Bitcoin", function() {
	it.todo("should ...");
});
