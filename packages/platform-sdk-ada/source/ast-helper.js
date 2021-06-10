const { Project, SyntaxKind } = require("ts-morph");

const updaters = {
	Client: ["transactions", "transaction", "wallet", "broadcast"],
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

	const transactionMembers = figureOutImplemented(
		project.getSourceFileOrThrow(`source/${serviceName.toLowerCase()}.service.ts`),
		`${serviceName}Service`,
		knownMethods,
	);

	let implemented = filterKnown(knownMethods, transactionMembers);

	const sharedSourceFile = project.getSourceFileOrThrow("source/networks/shared.ts");
	updateProperty(sharedSourceFile, "featureFlags", serviceName, implemented);
}

const project = new Project();
project.addSourceFilesAtPaths("source/**/*.ts");

for (const updaterName of Object.keys(updaters)) {
	doService(updaterName);
}

project.saveSync();
