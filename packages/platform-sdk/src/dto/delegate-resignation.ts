/* istanbul ignore file */

import { injectable } from "../ioc";
import { DelegateResignationData as Contract } from "./delegate-resignation.contract";
import { AbstractTransactionData } from "./transaction";

@injectable()
export class DelegateResignationData extends AbstractTransactionData implements Contract {}
