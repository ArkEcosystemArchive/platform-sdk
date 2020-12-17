import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { BTC } from "@arkecosystem/platform-sdk-btc";
import { ETH } from "@arkecosystem/platform-sdk-eth";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";

import { Contact } from "../src/contacts/contact";
import { ContactStruct } from "../src/contacts/contact.models";
import { container } from "../src/environment/container";
import { Identifiers } from "../src/environment/container.models";
import { Profile } from "../src/profiles/profile";

export const bootContainer = (): void => {
	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.Coins, { ARK, BTC, ETH });
}

export const makeProfile = (data: object = {}): Profile => new Profile({ id: "uuid", data: "", ...data });
export const makeContact = (data: ContactStruct, profile: Profile): Contact => new Contact(data, profile);
