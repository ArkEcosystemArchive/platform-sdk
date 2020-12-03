import { Resource } from "../resource";
import { Business } from "./business";
import { Delegate } from "./delegate";
import { Module } from "./module";
import { Plugin } from "./plugin";
import { Product } from "./product";
import { Setting } from "./setting";

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

	public setting(): Setting {
		return new Setting(this.getClient());
	}
}
