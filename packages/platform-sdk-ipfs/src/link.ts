export class Link {
	public static ipfs(id: string): string {
		return `https://gateway.ipfs.io/ipfs/${id}`;
	}

	public static pinata(id: string): string {
		return `https://gateway.pinata.cloud/ipfs/${id}`;
	}

	public static cloudflare(id: string): string {
		return `https://cloudflare-ipfs.com/ipfs/${id}`;
	}
}
