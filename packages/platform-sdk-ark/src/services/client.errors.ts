export const broadcastErrors = {
	ERR_INVALID_TRANSACTION_TYPE: "Transaction type (.*) does not exist.",
	ERR_DEACTIVATED_TRANSACTION_HANDLER: "Transaction type (.*) is deactivated.",
	ERR_UNSATISFIED_DEPENDENCY: "Transaction type (.*) is missing required dependencies",
	ERR_ALREADY_REGISTERED: "Transaction type (.*) is already registered",
	ERR_UNEXPECTED_NONCE: "Cannot (.*) a transaction with nonce (.*): the sender (.*) has nonce (.*).",
	ERR_COLD_WALLET: "Insufficient balance in database wallet. Wallet is not allowed to spend before funding is confirmed.",
	ERR_INSUFFICIENT_BALANCE: "Insufficient balance in the wallet.",
	ERR_SENDER_WALLET_MISMATCH: "Failed to apply transaction, because the public key does not match the wallet.",
	ERR_UNEXPECTED_SECOND_SIGNATURE: "Failed to apply transaction, because wallet does not allow second signatures.",
	ERR_MISSING_MULTI_SIGNATURE_ON_SENDER: "Failed to apply transaction, because sender does not have a multi signature.",
	ERR_INVALID_MULTI_SIGNATURES: "Failed to apply transaction, because the multi signatures are invalid.",
	ERR_UNSUPPORTED_MULTI_SIGNATURE_TRANSACTION: "Failed to apply transaction, because the transaction does not support multi signatures.",
	ERR_INVALID_SECOND_SIGNATURE: "Failed to apply transaction, because the second signature could not be verified.",
	ERR_WALLET_ALREADY_RESIGNED: "Failed to apply transaction, because the wallet already resigned as delegate.",
	ERR_WALLET_NOT_A_DELEGATE: "Failed to apply transaction, because the wallet is not a delegate.",
	ERR_WALLET_IS_ALREADY_DELEGATE: "Failed to apply transaction, because the wallet already has a registered username.",
	ERR_WALLET_USERNAME_ALREADY_REGISTERED: "Failed to apply transaction, because the username '(.*)' is already registered.",
	ERR_SECOND_SIGNATURE_ALREADY_REGISTERED: "Failed to apply transaction, because second signature is already enabled.",
	ERR_NOT_SUPPORTED_FOR_MULTI_SIGNATURE_WALLET: "Failed to apply transaction, because multi signature is enabled.",
	ERR_ALREADY_VOTED: "Failed to apply transaction, because the sender wallet has already voted.",
	ERR_NO_VOTE: "Failed to apply transaction, because the wallet has not voted.",
	ERR_UNVOTE_MISMATCH: "Failed to apply transaction, because the wallet vote does not match.",
	ERR_VOTED_FOR_NON_DELEGATE: "Failed to apply transaction, because only delegates can be voted.",
	ERR_VOTED_FOR_RESIGNED_DELEGATE: "Failed to apply transaction, because it votes for a resigned delegate.",
	ERR_NOT_ENOUGH_DELEGATES: "Failed to apply transaction, because not enough delegates to allow resignation.",
	ERR_MULTI_SIGNATURE_ALREADY_REGISTERED: "Failed to apply transaction, because multi signature is already enabled.",
	ERR_INVALID_MULTI_SIGNATURE: "Failed to apply transaction, because the multi signature could not be verified.",
	ERR_LEGACY_MULTI_SIGNATURE: "Failed to apply transaction, because legacy multi signature is no longer supported.",
	ERR_LEGACY_MULTI_SIGNATURE_REGISTRATION: "Failed to apply transaction, because legacy multi signature registrations are no longer supported.",
	ERR_MULTI_SIGNATURE_MINIMUM_KEYS: "Failed to apply transaction, because too few keys were provided.",
	ERR_MULTI_SIGNATURE_KEY_COUNT_MISMATCH: "Failed to apply transaction, because the number of provided keys does not match the number of signatures.",
	ERR_IPFS_HASH_ALREADY_E: "Failed to apply transaction, because this IPFS hash is already registered on the blockchain.",
	ERR_HTLC_LOCK_TRANSACTION_NOT_FOUND: "Failed to apply transaction, because the associated HTLC lock transaction could not be found.",
	ERR_HTLC_SECRET_HASH_MISMATCH: "Failed to apply transaction, because the secret provided does not match the associated HTLC lock transaction secret.",
	ERR_HTLC_LOCK_NOT_EXPIRED: "Failed to apply transaction, because the associated HTLC lock transaction did not expire yet.",
	ERR_HTLC_LOCK_EXPIRED: "Failed to apply transaction, because the associated HTLC lock transaction expired.",
	ERR_UNKNOWN: "Failed to apply transaction, because an unknown error occurred.",
}

export const guessBroadcastError = (error: string): string => {
	for (const [type, pattern] of Object.entries(broadcastErrors)) {
		if (new RegExp(pattern).test(error)) {
			return type;
		}
	}

	return "ERR_UNKNOWN";
}
