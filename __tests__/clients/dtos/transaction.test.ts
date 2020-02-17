import { Transaction } from "../../../src/clients/dtos/transaction";

let subject: Transaction;

beforeEach(() => (subject = new Transaction({ id: "...", amount: "..." })));

describe("Transaction", function() {
	it.todo("should ...");
});
