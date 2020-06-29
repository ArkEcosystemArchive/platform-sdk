import IPFS from "ipfs";

import { FileMap } from "./file.models";

export class File {
	readonly #client: IPFS;

	public constructor(client: string) {
		this.#client = client;
	}

	public async make(): Promise<File> {
		return new File(await IPFS.create());
	}

	public async upload(path: string, content: string): Promise<FileMap> {
		const files = await this.#client.add({
			path,
			content: Buffer.from(content),
		});

		const result: FileMap = {};

		for await (const file of files) {
			result[file.path] = file.cid.toString();
		}

		return result;
	}
}
