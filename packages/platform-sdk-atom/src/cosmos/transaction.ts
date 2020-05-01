import { signWithPrivateKey } from "./keys";
import { createSignature, createSignMessage } from "./signature";

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
	privateKey,
	chainId,
	accountNumber,
	sequence,
) {
	let signature: Buffer;
	let publicKey: string;

	const stdTx = createStdTx({ gas, gasPrices, memo }, messages);
	const signMessage = createSignMessage(stdTx, { sequence, accountNumber, chainId });

	try {
		// todo: replace this with the pubkey that belongs to the privkey
		publicKey = "0386b39760b417b960afbadb129bb14245938116770462bc7dac14c93840371cff";

		signature = signWithPrivateKey(signMessage, privateKey);
	} catch (err) {
		throw new Error("Signing failed: " + err.message);
	}

	return Object.assign({}, stdTx, {
		signatures: [createSignature(signature, sequence, accountNumber, publicKey)],
	});
}
