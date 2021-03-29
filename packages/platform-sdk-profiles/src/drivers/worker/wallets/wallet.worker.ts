import { expose } from "threads/worker";

import { decryptWIF } from "../../shared/wif";

expose({
	decryptWIF,
});
