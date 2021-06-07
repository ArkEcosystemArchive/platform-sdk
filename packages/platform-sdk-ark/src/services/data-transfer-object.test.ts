import "jest-extended";

import { createConfigWithNetwork } from "../../test/helpers";
import { DataTransferObjectService } from "./data-transfer-object";
import * as DTO from "../dto";

let subject: DataTransferObjectService;

beforeEach(async () => subject = await DataTransferObjectService.__construct(createConfigWithNetwork()));

describe("DataTransferObjectService", () => {
	it("should create a signed transaction", () => {
		const result = subject.signedTransaction("123", "{}");
		expect(result).toBeInstanceOf(DTO.SignedTransactionData);
	});

	it("should create a transaction", () => {
		const result = subject.transaction({foo: 123});
		expect(result).toBeInstanceOf(DTO.TransactionData);
	})
});
