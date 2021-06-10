"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _ParallelDelegateSyncer_clientService, _SerialDelegateSyncer_client;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerialDelegateSyncer = exports.ParallelDelegateSyncer = void 0;
const helpers_1 = require("../../../../helpers");
class ParallelDelegateSyncer {
	constructor(clientService) {
		_ParallelDelegateSyncer_clientService.set(this, void 0);
		__classPrivateFieldSet(this, _ParallelDelegateSyncer_clientService, clientService, "f");
	}
	async sync() {
		const result = [];
		let lastResponse = await __classPrivateFieldGet(this, _ParallelDelegateSyncer_clientService, "f").delegates();
		for (const item of lastResponse.items()) {
			result.push(item);
		}
		const currentPage = parseInt(lastResponse.currentPage());
		const lastPage = parseInt(lastResponse.lastPage());
		if (lastPage > currentPage) {
			const promises = [];
			const sendRequest = async (i) => {
				const response = await __classPrivateFieldGet(
					this,
					_ParallelDelegateSyncer_clientService,
					"f",
				).delegates({ cursor: i });
				for (const item of response.items()) {
					result.push(item);
				}
			};
			// Skip the first page and start from page 2 up to the last page.
			for (let i = currentPage + 1; i <= lastPage; i++) {
				promises.push(() => sendRequest(i));
			}
			await helpers_1.pqueueSettled(promises);
		}
		return result;
	}
}
exports.ParallelDelegateSyncer = ParallelDelegateSyncer;
_ParallelDelegateSyncer_clientService = new WeakMap();
class SerialDelegateSyncer {
	constructor(client) {
		_SerialDelegateSyncer_client.set(this, void 0);
		__classPrivateFieldSet(this, _SerialDelegateSyncer_client, client, "f");
	}
	async sync() {
		const result = [];
		let options = {};
		let lastResponse;
		do {
			lastResponse = await __classPrivateFieldGet(this, _SerialDelegateSyncer_client, "f").delegates(options);
			for (const item of lastResponse.items()) {
				result.push(item);
			}
			options = { cursor: lastResponse.nextPage() };
		} while (lastResponse.hasMorePages());
		return result;
	}
}
exports.SerialDelegateSyncer = SerialDelegateSyncer;
_SerialDelegateSyncer_client = new WeakMap();
//# sourceMappingURL=delegate-syncer.js.map
