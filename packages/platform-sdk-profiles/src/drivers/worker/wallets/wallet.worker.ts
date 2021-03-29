import { expose } from "threads/worker";

import { decryptWIF } from "./wallet.helpers";

expose({
	decryptWIF,
});
