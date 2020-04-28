import "jest-extended";

import { Client } from "../src/client";
import { Wallet } from "../src/dto";

let subject: Client;

beforeEach(() => (subject = new Client("wss://s.altnet.rippletest.net:51233")));

describe("Client", function () {
    describe("#getWallet", () => {
        it("should succeed", async () => {
            const result = await subject.getWallet("bdfkbzietxos");

            expect(result).toBeInstanceOf(Wallet);
        });
    });
});
