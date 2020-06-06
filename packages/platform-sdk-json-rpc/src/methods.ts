export const methods = [
	{
		name: "identities.wif.fromPassphrase",
		async method(params: { passphrase: string }) {
			return {
				wif: "",
			};
		},
		schema: {
			type: "object",
			properties: {
				network: {
					type: "string",
				},
				passphrase: {
					type: "string",
				},
			},
			required: ["network", "passphrase"],
		},
	},
];
