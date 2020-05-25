import { deletePassword, getPassword, setPassword } from "keytar";

export class Keychain {
	public static async get(service: string, account: string): Promise<string | undefined> {
		return (await getPassword(service, account)) || undefined;
	}

	public static async set(service: string, account: string, password: string): Promise<void> {
		return setPassword(service, account, password);
	}

	public static async forget(service: string, account: string): Promise<boolean> {
		return deletePassword(service, account);
	}
}
