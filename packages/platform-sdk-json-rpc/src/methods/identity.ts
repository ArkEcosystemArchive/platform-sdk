export const identityMethods = [
	// Address
	{
		name: "identity.address.fromMnemonic",
		async method(params: { mnemonic: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				mnemonic: {
					type: "string",
				},
			},
			required: ["coin", "network", "mnemonic"],
		},
	},
	{
		name: "identity.address.fromMultiSignature",
		async method(params: { min: string; publicKeys: string[] }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				min: {
					type: "string",
				},
				publicKeys: {
					type: "string",
				},
			},
			required: ["coin", "network", "min", "publicKeys"],
		},
	},
	{
		name: "identity.address.fromPublicKey",
		async method(params: { publicKey: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				publicKey: {
					type: "string",
				},
			},
			required: ["coin", "network", "publicKey"],
		},
	},
	{
		name: "identity.address.fromPrivateKey",
		async method(params: { privateKey: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				privateKey: {
					type: "string",
				},
			},
			required: ["coin", "network", "privateKey"],
		},
	},
	{
		name: "identity.address.fromWIF",
		async method(params: { wif: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				wif: {
					type: "string",
				},
			},
			required: ["coin", "network", "wif"],
		},
	},
	{
		name: "identity.address.validate",
		async method(params: { address: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				address: {
					type: "string",
				},
			},
			required: ["coin", "network", "address"],
		},
	},
	// Keys
	{
		name: "identity.keys.fromMnemonic",
		async method(params: { mnemonic: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				mnemonic: {
					type: "string",
				},
			},
			required: ["coin", "network", "mnemonic"],
		},
	},
	{
		name: "identity.keys.fromPrivateKey",
		async method(params: { privateKey: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				privateKey: {
					type: "string",
				},
			},
			required: ["coin", "network", "privateKey"],
		},
	},
	{
		name: "identity.keys.fromWIF",
		async method(params: { wif: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				wif: {
					type: "string",
				},
			},
			required: ["coin", "network", "wif"],
		},
	},
	// Private Key
	{
		name: "identity.privateKey.fromMnemonic",
		async method(params: { mnemonic: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				mnemonic: {
					type: "string",
				},
			},
			required: ["coin", "network", "mnemonic"],
		},
	},
	{
		name: "identity.privateKey.fromWIF",
		async method(params: { wif: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				wif: {
					type: "string",
				},
			},
			required: ["coin", "network", "wif"],
		},
	},
	// Public Key
	{
		name: "identity.publicKey.fromMnemonic",
		async method(params: { mnemonic: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				mnemonic: {
					type: "string",
				},
			},
			required: ["coin", "network", "mnemonic"],
		},
	},
	{
		name: "identity.publicKey.fromMultiSignature",
		async method(params: { min: string; publicKeys: string[] }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				min: {
					type: "string",
				},
				publicKeys: {
					type: "string",
				},
			},
			required: ["coin", "network", "min", "publicKeys"],
		},
	},
	{
		name: "identity.publicKey.fromWIF",
		async method(params: { wif: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				wif: {
					type: "string",
				},
			},
			required: ["coin", "network", "wif"],
		},
	},
	// WIF
	{
		name: "identity.wif.fromMnemonic",
		async method(params: { mnemonic: string }) {
			return {};
		},
		schema: {
			type: "object",
			properties: {
				coin: {
					type: "string",
				},
				network: {
					type: "string",
				},
				mnemonic: {
					type: "string",
				},
			},
			required: ["coin", "network", "mnemonic"],
		},
	},
];
