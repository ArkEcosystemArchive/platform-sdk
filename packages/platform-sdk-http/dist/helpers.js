"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTrailingSlash = void 0;
const ensureTrailingSlash = (url) => {
	const lastCharacter = url.substr(-1);
	if (lastCharacter != "/") {
		url = url + "/";
	}
	return url;
};
exports.ensureTrailingSlash = ensureTrailingSlash;
//# sourceMappingURL=helpers.js.map
