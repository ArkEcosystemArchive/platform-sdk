module.exports = {
	flagsToString: (flags) => {
		const mappedFlags = [];

		for (const [key, value] of Object.entries(flags)) {
			if (value !== undefined) {
				if (value === true) {
					mappedFlags.push(`--${key}`);
				} else if (typeof value === "string") {
					mappedFlags.push(value.includes(" ") ? `--${key}="${value}"` : `--${key}=${value}`);
				} else {
					mappedFlags.push(`--${key}=${value}`);
				}
			}
		}

		return mappedFlags.join(" ");
	},
};
