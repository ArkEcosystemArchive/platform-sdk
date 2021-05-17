import "jest-extended";

import { FeatureFlag } from "./enums";

test("FeatureFlag", () => {
	expect(FeatureFlag).toMatchInlineSnapshot(`
		Object {
		  "ClientBroadcast": "Client.broadcast",
		  "ClientConfiguration": "Client.configuration",
		  "ClientDelegate": "Client.delegate",
		  "ClientDelegates": "Client.delegates",
		  "ClientFees": "Client.fees",
		  "ClientSyncing": "Client.syncing",
		  "ClientTransaction": "Client.transaction",
		  "ClientTransactions": "Client.transactions",
		  "ClientVoters": "Client.voters",
		  "ClientVotes": "Client.votes",
		  "ClientWallet": "Client.wallet",
		  "ClientWallets": "Client.wallets",
		  "DerivationBIP39": "Derivation.bip39",
		  "DerivationBIP44": "Derivation.bip44",
		  "DerivationBIP49": "Derivation.bip49",
		  "DerivationBIP84": "Derivation.bip84",
		  "FeeAll": "Fee.all",
		  "IdentityAddressMnemonic": "Identity.address.mnemonic",
		  "IdentityAddressMultiSignature": "Identity.address.multiSignature",
		  "IdentityAddressPrivateKey": "Identity.address.privateKey",
		  "IdentityAddressPublicKey": "Identity.address.publicKey",
		  "IdentityAddressWif": "Identity.address.wif",
		  "IdentityKeyPairMnemonic": "Identity.keyPair.mnemonic",
		  "IdentityKeyPairPrivateKey": "Identity.keyPair.privateKey",
		  "IdentityKeyPairWif": "Identity.keyPair.wif",
		  "IdentityPrivateKeyMnemonic": "Identity.privateKey.mnemonic",
		  "IdentityPrivateKeyWif": "Identity.privateKey.wif",
		  "IdentityPublicKeyMnemonic": "Identity.publicKey.mnemonic",
		  "IdentityPublicKeyMultiSignature": "Identity.publicKey.multiSignature",
		  "IdentityPublicKeyWif": "Identity.publicKey.wif",
		  "IdentityWifMnemonic": "Identity.wif.mnemonic",
		  "InternalFastDelegateSync": "Internal.fastDelegateSync",
		  "LedgerGetPublicKey": "Ledger.getPublicKey",
		  "LedgerGetVersion": "Ledger.getVersion",
		  "LedgerSignMessage": "Ledger.signMessage",
		  "LedgerSignTransaction": "Ledger.signTransaction",
		  "LinkBlock": "Link.block",
		  "LinkTransaction": "Link.transaction",
		  "LinkWallet": "Link.wallet",
		  "MessageSign": "Message.sign",
		  "MessageVerify": "Message.verify",
		  "MiscellaneousDynamicFees": "Miscellaneous.dynamicFees",
		  "MiscellaneousMemo": "Miscellaneous.memo",
		  "MiscellaneousUTXO": "Miscellaneous.utxo",
		  "PeerSearch": "Peer.search",
		  "TransactionDelegateRegistration": "Transaction.delegateRegistration",
		  "TransactionDelegateResignation": "Transaction.delegateResignation",
		  "TransactionHtlcClaim": "Transaction.htlcClaim",
		  "TransactionHtlcLock": "Transaction.htlcLock",
		  "TransactionHtlcRefund": "Transaction.htlcRefund",
		  "TransactionIpfs": "Transaction.ipfs",
		  "TransactionMultiPayment": "Transaction.multiPayment",
		  "TransactionMultiSignature": "Transaction.multiSignature",
		  "TransactionSecondSignature": "Transaction.secondSignature",
		  "TransactionTransfer": "Transaction.transfer",
		  "TransactionVote": "Transaction.vote",
		}
	`);
});
