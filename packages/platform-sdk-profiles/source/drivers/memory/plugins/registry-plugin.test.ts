import "jest-extended";
import "reflect-metadata";

import { RegistryPlugin } from "./registry-plugin";

describe("RegistryPlugin", () => {
	describe("sourceProvider", () => {
		it("should handle github source provider", async () => {
			const subject = new RegistryPlugin(
				{
					links: {
						repository: "https://github.com/company/project",
					},
				},
				{},
			);

			expect(subject.sourceProvider().url).toBe("https://github.com/company/project");
		});

		it("should handle bitbucket source provider", async () => {
			const subject = new RegistryPlugin(
				{
					links: {
						repository: "https://bitbucket.com/company/project",
					},
				},
				{},
			);

			expect(subject.sourceProvider().url).toBe("https://bitbucket.com/company/project");
		});

		it("should handle gitlab source provider", async () => {
			const subject = new RegistryPlugin(
				{
					links: {
						repository: "https://gitlab.com/company/project",
					},
				},
				{},
			);

			expect(subject.sourceProvider().url).toBe("https://gitlab.com/company/project");
		});

		it("should handle unknown source provider", async () => {
			const subject = new RegistryPlugin(
				{
					links: {
						repository: "https://mycompany.com/project",
					},
				},
				{},
			);

			expect(subject.sourceProvider()).toBeNull();
		});
	});

	describe("getMetadata", () => {
		it("should find the requested key", async () => {
			const subject = new RegistryPlugin(
				{},
				{
					title: "someValue",
				},
			);

			expect(subject.alias()).toBe("someValue");
		});

		it("should find the requested desktop-wallet key", async () => {
			const subject = new RegistryPlugin(
				{},
				{
					"desktop-wallet": {
						logo: "someValue",
					},
				},
			);

			expect(subject.logo()).toBe("someValue");
		});

		it("should miss the requested desktop-wallet key", async () => {
			const subject = new RegistryPlugin(
				{},
				{
					"desktop-wallet": {
						title: "someValue",
					},
				},
			);

			expect(subject.logo()).toBeUndefined();
		});

		it("should miss the requested key", async () => {
			const subject = new RegistryPlugin(
				{},
				{
					title: "someValue",
				},
			);

			expect(subject.logo()).toBeUndefined();
		});
	});
});
