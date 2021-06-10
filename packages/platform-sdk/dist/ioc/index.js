"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				Object.defineProperty(o, k2, {
					enumerable: true,
					get: function () {
						return m[k];
					},
				});
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __exportStar =
	(this && this.__exportStar) ||
	function (m, exports) {
		for (var p in m)
			if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConstruct = exports.injectable = exports.inject = void 0;
const inversify_1 = require("inversify");
Object.defineProperty(exports, "inject", {
	enumerable: true,
	get: function () {
		return inversify_1.inject;
	},
});
Object.defineProperty(exports, "injectable", {
	enumerable: true,
	get: function () {
		return inversify_1.injectable;
	},
});
Object.defineProperty(exports, "postConstruct", {
	enumerable: true,
	get: function () {
		return inversify_1.postConstruct;
	},
});
__exportStar(require("./container"), exports);
__exportStar(require("./service-provider"), exports);
__exportStar(require("./service-provider.contract"), exports);
// @TODO: for some reason this doesn't exist in the 5.1.1 NPM tag even though it shows as included on github
// https://github.com/inversify/InversifyJS/blob/094bcd6e0b1a56ed85ac9b4f66410910075ef4fc/wiki/pre_destroy.md
// https://github.com/inversify/InversifyJS/blob/094bcd6e0b1a56ed85ac9b4f66410910075ef4fc/wiki/deactivation_handler.md
// https://github.com/inversify/InversifyJS/blob/094bcd6e0b1a56ed85ac9b4f66410910075ef4fc/src/annotation/pre_destroy.ts
//# sourceMappingURL=index.js.map
