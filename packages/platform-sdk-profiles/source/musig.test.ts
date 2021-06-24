import "jest-extended";
import "reflect-metadata";

import { v4 as uuidv4 } from "uuid";

import { identity } from "../test/fixtures/identity";
import { bootContainer } from "../test/mocking";
import { Profile } from "./profile";
import { Wallet } from "./wallet";
import { TransactionService } from "./wallet-transaction.service";
import { IProfile, IReadWriteWallet, ProfileSetting } from "./contracts";

let profile: IProfile;
let wallet: IReadWriteWallet;
let subject: TransactionService;

beforeAll(() => {
	bootContainer();
});

beforeEach(async () => {
	profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	wallet = new Wallet(uuidv4(), {}, profile);

	await wallet.mutator().coin("ARK", "ark.devnet");
	await wallet.mutator().identity(identity.mnemonic);

	subject = new TransactionService(wallet);
});

it.skip("should perform a transfer", async () => {
	const PA = "wallet1";
	const PB = "wallet2";
	const PC = "wallet3";

	const publicKeys = [
		(await wallet.coin().publicKey().fromMnemonic(PA)).publicKey,
		(await wallet.coin().publicKey().fromMnemonic(PB)).publicKey,
		(await wallet.coin().publicKey().fromMnemonic(PC)).publicKey,
	];

	wallet = await profile.walletFactory().fromAddress({
		coin: "ARK",
		network: "ark.devnet",
		address: "DTToLoKRFviEppvVLAZtdY1mJsE8q43DMe",
	});
	await wallet.synchroniser().identity();

	const uuid = await wallet.transaction().signTransfer({
		nonce: wallet.nonce().plus(1).toString(),
		signatory: await wallet.coin().signatory().multiSignature(2, publicKeys),
		data: {
			amount: 1,
			to: "DTToLoKRFviEppvVLAZtdY1mJsE8q43DMe",
		},
	});

	// Add the first signature and re-broadcast the transaction.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PA));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Add the second signature and re-broadcast the transaction.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PB));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Add the third signature and re-broadcast the transaction.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PC));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Add the final signature by signing the whole transaction with the signatures of all participants.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PA));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Broadcast the multi signature.
	for (const signedID of Object.keys(wallet.transaction().signed())) {
		console.log(JSON.stringify(await wallet.transaction().broadcast(signedID), null, 4));
	}
});

it.skip("should perform a registration", async () => {
	const PA = "wallet1";
	const PB = "wallet2";
	const PC = "wallet3";

	const publicKeys = [
		(await wallet.coin().publicKey().fromMnemonic(PA)).publicKey,
		(await wallet.coin().publicKey().fromMnemonic(PB)).publicKey,
		(await wallet.coin().publicKey().fromMnemonic(PC)).publicKey,
	];

	wallet = await profile.walletFactory().fromMnemonicWithBIP39({
		coin: "ARK",
		network: "ark.devnet",
		mnemonic: PA,
	});
	await wallet.synchroniser().identity();

	const uuid = await wallet.transaction().signMultiSignature({
		nonce: wallet.nonce().plus(1).toString(),
		fee: 5,
		signatory: await wallet.coin().signatory().multiSignature(2, publicKeys),
		data: {
			publicKeys,
			min: 2,
			senderPublicKey: wallet.publicKey(),
		},
	});

	// Add the first signature and re-broadcast the transaction.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PA));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Add the second signature and re-broadcast the transaction.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PB));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Add the third signature and re-broadcast the transaction.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PC));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Add the final signature by signing the whole transaction with the signatures of all participants.
	await wallet.transaction().addSignature(uuid, await wallet.coin().signatory().mnemonic(PA));

	// Sync all of the transactions from the Multi-Signature Server and check the state of each.
	await wallet.transaction().sync();

	// Broadcast the multi signature.
	for (const signedID of Object.keys(wallet.transaction().signed())) {
		console.log(JSON.stringify(await wallet.transaction().broadcast(signedID), null, 4));
	}
});
