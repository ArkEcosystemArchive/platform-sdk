import { DTO } from "@arkecosystem/platform-sdk";

import { TransactionData } from "../transaction";

export class TransferData extends TransactionData implements DTO.DelegateRegistrationData {
	// @TODO: think about moving the "memo" method out of "TransactionData" specifically into "TransferData"
}
