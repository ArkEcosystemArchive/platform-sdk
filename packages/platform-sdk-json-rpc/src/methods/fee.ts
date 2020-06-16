export const feeMethods = [
	{
		name: "fee.all",
		async method(params: { days: number }) {
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
				days: {
					type: "number",
				},
			},
			required: ["coin", "network", "days"],
		},
	},
];
