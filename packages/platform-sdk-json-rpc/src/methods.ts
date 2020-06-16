import { feeMethods } from "./methods/fee";
import { identityMethods } from "./methods/identity";

export const methods = [...feeMethods, ...identityMethods];
