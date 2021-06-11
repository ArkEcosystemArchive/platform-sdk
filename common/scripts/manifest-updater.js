const path = require("path");
const fs = require("fs");

const { Project, SyntaxKind } = require("ts-morph");

const updaters = {
	Client: [
		"transaction",
		"transactions",
		"wallet",
		"wallets",
		"delegate",
		"delegates",
		"votes",
		"voters",
		"configuration",
		"fees",
		"syncing",
		"broadcast",
	],
	Ledger: ["getVersion", "getPublicKey", "signTransaction", "signMessage"],
	Message: ["sign", "verify"],
	Transaction: [
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
	],
};

const projectFolder = path.join(process.cwd());
if (!fs.existsSync(path.join(projectFolder, "source/networks/shared.ts"))) {
	console.log("Ignoring in", projectFolder);
	return;
}
console.log("Fixing manifest in", projectFolder);

function figureOutImplemented(sourceFile, className, knownMethods) {
	let transactionService = sourceFile.getClassOrThrow(className);

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

	console.log(`🌍 ADA supports ${countSupported} out of ${knownMethods.length} methods for the ${className}`);
	return members;
}

function updateProperty(shared, varName, propertyName, propertyValues) {
	const variable = shared.getVariableDeclarationOrThrow(varName);

	const variableInitializer = variable.getInitializerOrThrow();
	const childSyntaxList = variableInitializer.getChildSyntaxListOrThrow();

	for (let child of childSyntaxList.getChildrenOfKind(SyntaxKind.PropertyAssignment)) {
		if (child.getName() === propertyName) {
			const transactionList = child.getFirstChildByKindOrThrow(SyntaxKind.ArrayLiteralExpression);
			let elementsToRemove = transactionList.getElements().length;
			for (let i = 0; i < elementsToRemove; i++) {
				transactionList.removeElement(0);
			}
			transactionList.addElements(propertyValues);
		}
	}
}

function filterKnown(knownMethods, members) {
	return knownMethods.filter((method) => members.includes(method)).map((method) => `"${method}"`);
}

function doService(serviceName) {
	console.log(`Running for service ${serviceName}`);

	const knownMethods = updaters[serviceName];

	const serviceSourceFileName = path.join(projectFolder, `source/${serviceName.toLowerCase()}.service.ts`);
	const serviceSourceFile = project.getSourceFile(serviceSourceFileName);
	if (!serviceSourceFile) {
		// TODO Perhaps we should just remove the property from the manifest, or set it to []
		console.log("service doesn't exist", serviceSourceFileName);
		return;
	}

	const transactionMembers = figureOutImplemented(serviceSourceFile, `${serviceName}Service`, knownMethods);

	let implemented = filterKnown(knownMethods, transactionMembers);

	const sharedSourceFile = project.getSourceFileOrThrow(path.join(projectFolder, "source/networks/shared.ts"));
	updateProperty(sharedSourceFile, "featureFlags", serviceName, implemented);
}

const project = new Project();
project.addSourceFilesAtPaths(path.join(projectFolder, "/source/**/*.ts"));

for (const updaterName of Object.keys(updaters)) {
	doService(updaterName);
}

project.saveSync();
