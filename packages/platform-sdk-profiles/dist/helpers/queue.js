"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pqueueSettled = exports.pqueue = void 0;
const p_queue_1 = __importDefault(require("p-queue"));
// Infinity is the default concurrency but we keep it at a reasonable 100 to limit resource usage.
const pqueue = async (promises, concurrency = 100) => new p_queue_1.default({ concurrency }).addAll(promises);
exports.pqueue = pqueue;
const pqueueSettled = async (promises, concurrency = 100) => Promise.allSettled(promises.map((promise) => promise()));
exports.pqueueSettled = pqueueSettled;
//# sourceMappingURL=queue.js.map
