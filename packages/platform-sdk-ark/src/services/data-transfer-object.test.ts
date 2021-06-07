import "jest-extended";

import { createService } from "../../test/helpers";
import { DataTransferObjectService } from "./data-transfer-object";
import * as DTO from "../dto";

let subject: DataTransferObjectService;

beforeEach(() => subject = createService(DataTransferObjectService));

describe("DataTransferObjectService", () => {
	it("should create a signed transaction", () => {
		const result = subject.signedTransaction("123", "{}", "");
		expect(result).toBeInstanceOf(DTO.SignedTransactionData);
	});
});
