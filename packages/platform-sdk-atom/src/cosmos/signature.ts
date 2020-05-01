import { removeEmptyProperties } from "./utils";

export const createSignMessage = (jsonTx, { sequence, accountNumber, chainId }) =>
	JSON.stringify(
		removeEmptyProperties({
			fee: {
				amount: jsonTx.fee.amount || [],
				gas: jsonTx.fee.gas,
			},
			memo: jsonTx.memo,
			msgs: jsonTx.msg, // weird msg vs. msgs
			sequence,
			account_number: accountNumber,
			chain_id: chainId,
		}),
	);

export const createSignature = (signature, sequence, accountNumber, publicKey) => ({
	signature: signature.toString(`base64`),
	account_number: accountNumber,
	sequence,
	pub_key: {
		type: `tendermint/PubKeySecp256k1`, // TODO: allow other keytypes
		value: publicKey.toString(`base64`),
	},
});
