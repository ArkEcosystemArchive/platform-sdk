import { expose } from "threads/worker";

import { decryptWIF } from "../../shared/wallet.helpers";

expose({
	decryptWIF,
});
