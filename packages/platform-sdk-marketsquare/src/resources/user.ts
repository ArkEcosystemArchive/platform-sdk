import { Resource } from "./resource";
import { Business } from "./user/business";
import { Delegate } from "./user/delegate";
import { Module } from "./user/module";
import { Plugin } from "./user/plugin";
import { Product } from "./user/product";
import { Wallet } from "./user/wallet";

export class User extends Resource {
	public business(): Business {
		return new Business(this.getClient());
	}

	public delegate(): Delegate {
		return new Delegate(this.getClient());
	}

	public module(): Module {
		return new Module(this.getClient());
	}

	public plugin(): Plugin {
		return new Plugin(this.getClient());
	}

	public product(): Product {
		return new Product(this.getClient());
	}

	public wallet(): Wallet {
		return new Wallet(this.getClient());
	}
}
