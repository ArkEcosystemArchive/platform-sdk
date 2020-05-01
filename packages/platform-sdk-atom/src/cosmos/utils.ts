export function removeEmptyProperties(jsonTx) {
	if (Array.isArray(jsonTx)) {
		return jsonTx.map(removeEmptyProperties);
	}

	// string or number
	if (typeof jsonTx !== `object`) {
		return jsonTx;
	}

	const sorted = {};
	Object.keys(jsonTx)
		.sort()
		.forEach((key) => {
			if (jsonTx[key] === undefined || jsonTx[key] === null) return;

			sorted[key] = removeEmptyProperties(jsonTx[key]);
		});
	return sorted;
}
