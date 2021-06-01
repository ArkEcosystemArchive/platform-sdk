const { Project } = require("ts-morph");

// setup
const project = new Project();
project.addSourceFilesAtPaths("src/**/*.ts");

const knownMethods = [
	"delegateRegistration",
	"delegateResignation",
	"htlcClaim",
	"htlcLock",
	"htlcRefund",
	"ipfs",
	"multiPayment",
	"multiSignature",
	"secondSignature",
	"transfer",
	"vote",
	"estimateExpiration",
];

// load
let transactionService = project.getSourceFileOrThrow("src/services/transaction.ts");
transactionService = transactionService.getClass("TransactionService");

// parse
const members = [];
for (const member of transactionService.getInstanceMembers()) {
	members.push(member.getName());
}

// evaluate
let countSupported = 0;
for (const knownMethod of knownMethods) {
	if (members.includes(knownMethod)) {
		console.log(`🎊 ${knownMethod}`);

		countSupported++;
	} else {
		console.log(`💣 ${knownMethod}`);
	}
}

console.log(`🌍 ADA supports ${countSupported} out of ${knownMethods.length} methods for the TransactionService`);
