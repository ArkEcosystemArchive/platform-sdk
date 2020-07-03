import "jest-extended";

import { Keychain } from "./keychain";

const service = "platform-sdk";
const account = "john";

test.skip("sets, gets and forgets an account for the given service", async () => {
	await Keychain.set(service, account, "secret");

	await expect(Keychain.get(service, account)).resolves.toBe("secret");

	await Keychain.forget(service, account);

	await expect(Keychain.get(service, account)).resolves.toBeUndefined();
});
