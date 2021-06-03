export const ensureTrailingSlash = (url: string): string => {
	const lastCharacter = url.substr(-1);

	if (lastCharacter != "/") {
		url = url + "/";
	}

	return url;
};
