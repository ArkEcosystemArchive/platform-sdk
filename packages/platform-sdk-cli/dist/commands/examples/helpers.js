"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pollTransactionStatus = exports.createProfile = exports.useLogger = void 0;
const useLogger = () => console;
exports.useLogger = useLogger;
async function createProfile(env, name, password) {
	const findByName = env.profiles().findByName(name);
	if (findByName) {
		env.profiles().forget(findByName.id());
	}
	const profile = env.profiles().create(name);
	profile.auth().setPassword(password);
	env.profiles().persist(profile);
	await env.persist();
	return profile;
}
exports.createProfile = createProfile;
async function pollTransactionStatus(transactionId, wallet1) {
	exports.useLogger().info(`Transaction [${transactionId}] is awaiting confirmation.`);
	let awaitingConfirmation = true;
	while (awaitingConfirmation) {
		try {
			awaitingConfirmation = await wallet1.transaction().confirm(transactionId);
		} catch {
			awaitingConfirmation = false;
		}
	}
	exports.useLogger().info(`Transaction [${transactionId}] is confirmed.`);
}
exports.pollTransactionStatus = pollTransactionStatus;
//# sourceMappingURL=helpers.js.map
