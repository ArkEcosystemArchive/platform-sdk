import { signWithPrivateKey } from "./keys";
import { createSignature, createSignMessage } from "./signature";
import { IdentityService } from "../services";

const DEFAULT_GAS_PRICE = [{ amount: (2.5e-8).toFixed(9), denom: `uatom` }];

const createStdTx = ({ gas, gasPrices, memo }, messages) => {
	const fees = gasPrices
		.map(({ amount, denom }) => ({ amount: String(Math.round(amount * gas)), denom }))
		.filter(({ amount }) => amount > 0);

	return {
		msg: Array.isArray(messages) ? messages : [messages],
		fee: {
			amount: fees.length > 0 ? fees : null,
			gas,
		},
		signatures: null,
		memo,
	};
};

export async function createSignedTransaction(
	{ gas, gasPrices = DEFAULT_GAS_PRICE, memo = `` },
	messages,
	passphrase,
	chainId,
	accountNumber,
	sequence,
) {
	let signature: Buffer;
	let publicKey: string;

	const stdTx = createStdTx({ gas, gasPrices, memo }, messages);
	const signMessage = createSignMessage(stdTx, { sequence, accountNumber, chainId });

	try {
		const identityService = await IdentityService.construct({});

		publicKey = await identityService.getPublicKey({ passphrase });
		signature = signWithPrivateKey(signMessage, publicKey);
	} catch (err) {
		throw new Error("Signing failed: " + err.message);
	}

	return Object.assign({}, stdTx, {
		signatures: [createSignature(signature, sequence, accountNumber, publicKey)],
	});
}
