export class Link {
	public static ipfs(id: string): string {
		return `https://gateway.ipfs.io/ipfs/${id}`;
	}

	public static cloudFlare(id: string): string {
		return `https://cloudflare-ipfs.com/ipfs/${id}`;
	}
}
