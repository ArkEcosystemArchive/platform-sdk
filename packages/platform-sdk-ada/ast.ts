import {
	ClassDeclaration,
	Project,
	SourceFile,
	OptionalKind,
	VariableDeclarationKind,
	VariableStatementStructure,
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

let supported = knownMethods
	.filter((method) => members.includes(method))
	.map((method) => `"${method}"`)
	.join(", ");

// Create shared file
let shared: SourceFile = project.getDirectoryOrThrow("src/networks").createSourceFile("shared2.ts");
shared.addImportDeclaration({
	namedImports: ["Coins"],
	moduleSpecifier: "@arkecosystem/platform-sdk",
});

shared.addVariableStatement({
	declarationKind: VariableDeclarationKind.Const, // defaults to "let"
	declarations: [
		{
			name: "importMethods",
			type: "Coins.NetworkManifestImportMethods",
			initializer: `{}`,
		},
	],
});

const newVar: OptionalKind<VariableStatementStructure> = {
	declarationKind: VariableDeclarationKind.Const, // defaults to "let"
	declarations: [
		{
			name: "featureFlags",
			type: "Coins.NetworkManifestFeatureFlags",

			// TODO More than a fixed initializer string it would be nice to build it with code
			// Adding intentation, etc...
			initializer: `{
			Transaction: [${supported}],
		}`,
		},
	],
};
shared.addVariableStatement(newVar);

shared.addExportDeclaration({
	namedExports: [
		{
			name: "importMethods",
		},
		{
			name: "featureFlags",
		},
	],
});
shared.save();
