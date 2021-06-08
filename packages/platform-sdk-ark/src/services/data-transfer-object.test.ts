import "jest-extended";

import { IoC } from "@arkecosystem/platform-sdk";

import { createService } from "../../test/helpers";
import { SignedTransactionData } from "../dto";
import { DataTransferObjectService } from "./data-transfer-object";

let subject: DataTransferObjectService;

beforeEach(() => {
	subject = createService(DataTransferObjectService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
	});
});

describe("DataTransferObjectService", () => {
	it("should create a signed transaction", () => {
		const result = subject.signedTransaction("123", "{}", "");
		expect(result).toBeInstanceOf(SignedTransactionData);
	});
});
