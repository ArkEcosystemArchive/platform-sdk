import {
	ArrayLiteralExpression,
	ClassDeclaration,
	Expression,
	SourceFile,
	SyntaxKind,
	SyntaxList,
	VariableDeclaration,
	Project,
} from "ts-morph";

const updaters = {
	Client: ["transactions", "transaction", "wallet", "broadcast"],
	// Link: ["block", "transaction", "wallet"],
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

export class Updater {

	readonly #project: Project;

	constructor() {
		this.#project = new Project();
		this.#project.addSourceFilesAtPaths("src/**/*.ts");
	}

	run() {
		for (const updaterName of Object.keys(updaters)) {
			this.doService(updaterName);
		}

		this.#project.save();
	}

	figureOutImplemented(sourceFile: SourceFile, className, knownMethods) {
		let transactionService: ClassDeclaration = sourceFile.getClassOrThrow(className);

		// parse
		const members: string[] = [];
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

		console.log(
			`🌍 ADA supports ${countSupported} out of ${knownMethods.length} methods for the ${className}`,
		);
		return members;
	}

	updateProperty(shared: SourceFile, varName: string, propertyName: string, propertyValues: string[]): void {
		const variable: VariableDeclaration = shared.getVariableDeclarationOrThrow(varName);

		const variableInitializer: Expression = variable.getInitializerOrThrow();
		const childSyntaxList: SyntaxList = variableInitializer.getChildSyntaxListOrThrow();

		for (let child of childSyntaxList.getChildrenOfKind(SyntaxKind.PropertyAssignment)) {
			if (child.getName() === propertyName) {
				const transactionList: ArrayLiteralExpression = child.getFirstChildByKindOrThrow(
					SyntaxKind.ArrayLiteralExpression,
				);
				let elementsToRemove = transactionList.getElements().length;
				for (let i = 0; i < elementsToRemove; i++) {
					transactionList.removeElement(0);
				}
				transactionList.addElements(propertyValues);
			}
		}
	}

	filterKnown(knownMethods: string[], members: string[]): string[] {
		return knownMethods.filter((method) => members.includes(method)).map((method) => `"${method}"`);
	}

	doService(serviceName) {
		console.log(`Running for service ${serviceName}`);

		const knownMethods: string[] = updaters[serviceName];

		const transactionMembers: string[] = this.figureOutImplemented(
			this.#project.getSourceFileOrThrow(`src/services/${serviceName.toLowerCase()}.ts`),
			`${serviceName}Service`,
			knownMethods,
		);

		let implemented: string[] = this.filterKnown(knownMethods, transactionMembers);

		const sharedSourceFile = this.#project.getSourceFileOrThrow("src/networks/shared.ts");
		this.updateProperty(sharedSourceFile, "featureFlags", serviceName, implemented);
	}
}
