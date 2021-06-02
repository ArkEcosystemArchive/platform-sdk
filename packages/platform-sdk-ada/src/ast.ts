import {
	ArrayLiteralExpression,
	ClassDeclaration,
	Expression,
	Project,
	SourceFile,
	SyntaxKind,
	SyntaxList,
	VariableDeclaration,
} from "ts-morph";

// setup
const project: Project = new Project();
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
let transactionSource: SourceFile = project.getSourceFileOrThrow("src/services/transaction.ts");
let transactionService: ClassDeclaration = transactionSource.getClassOrThrow("TransactionService");

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

console.log(`🌍 ADA supports ${countSupported} out of ${knownMethods.length} methods for the TransactionService`);

// Now update the shared.ts file

// Open shared file
let shared: SourceFile = project.getDirectoryOrThrow("src/networks").getSourceFileOrThrow("shared.ts");

let varName = "featureFlags";
let propertyName = "Transaction";
let propertyValues = knownMethods.filter((method) => members.includes(method)).map((method) => `"${method}"`);

function fixVariable(varName: string, propertyName: string, propertyValues: array): void {
	const featureFlags: VariableDeclaration = shared.getVariableDeclarationOrThrow(varName);

	const featureFlagsInitializer: Expression = featureFlags.getInitializerOrThrow();
	const childSyntaxList: SyntaxList = featureFlagsInitializer.getChildSyntaxListOrThrow();

	for (let child of childSyntaxList.getChildrenOfKind(SyntaxKind.PropertyAssignment)) {
		console.log(child.getKindName(), child.getName(), child.getText(), "\n");
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

fixVariable(varName, propertyName, propertyValues);

shared.save();
