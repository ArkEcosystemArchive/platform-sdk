"use strict";
/* istanbul ignore file */
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractWalletData = void 0;
const exceptions_1 = require("../exceptions");
const ioc_1 = require("../ioc");
let AbstractWalletData = class AbstractWalletData {
	constructor(data) {
		Object.defineProperty(this, "data", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: data,
		});
	}
	// Wallet
	primaryKey() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.primaryKey.name);
	}
	address() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.address.name);
	}
	publicKey() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.publicKey.name);
	}
	balance() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.balance.name);
	}
	nonce() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.nonce.name);
	}
	// Second Signature
	secondPublicKey() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}
	// Delegate
	username() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.username.name);
	}
	rank() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.rank.name);
	}
	votes() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.votes.name);
	}
	// Flags
	isDelegate() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isDelegate.name);
	}
	isResignedDelegate() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isResignedDelegate.name);
	}
	isMultiSignature() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isMultiSignature.name);
	}
	isSecondSignature() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}
	toObject() {
		return {
			address: this.address(),
			publicKey: this.publicKey(),
			balance: this.balance(),
			nonce: this.nonce(),
			username: this.username(),
			rank: this.rank(),
			votes: this.votes(),
			isDelegate: this.isDelegate(),
			isResignedDelegate: this.isResignedDelegate(),
			isMultiSignature: this.isMultiSignature(),
			isSecondSignature: this.isSecondSignature(),
		};
	}
	raw() {
		return this.data;
	}
	hasPassed() {
		return Object.keys(this.data).length > 0;
	}
	hasFailed() {
		return !this.hasPassed();
	}
};
AbstractWalletData = __decorate([ioc_1.injectable(), __metadata("design:paramtypes", [Object])], AbstractWalletData);
exports.AbstractWalletData = AbstractWalletData;
//# sourceMappingURL=wallet.js.map
