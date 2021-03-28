import { expose } from "threads/worker";
import { decrypt } from "bip38";

expose({
	decrypt,
});
