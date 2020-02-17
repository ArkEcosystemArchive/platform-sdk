import { Block } from "../../../src/clients/dtos/block";

let subject: Block;

beforeEach(() => (subject = new Block({ id: "...", height: "..." })));

describe("Block", function() {
	it.todo("should ...");
});
