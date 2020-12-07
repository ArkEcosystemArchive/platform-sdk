import { EntityAction, EntitySubType, EntityType } from "./enums";

describe("enums", () => {
	describe("EntityType", () => {
		it("should have the right values", () => {
			expect(EntityType.Business).toBe(0);
			expect(EntityType.Product).toBe(1);
			expect(EntityType.Plugin).toBe(2);
			expect(EntityType.Module).toBe(3);
			expect(EntityType.Delegate).toBe(4);
		});
	});
	describe("EntitySubType", () => {
		it("should have the right values", () => {
			expect(EntitySubType.None).toBe(0);
			expect(EntitySubType.PluginCore).toBe(1);
			expect(EntitySubType.PluginDesktop).toBe(2);
		});
	});
	describe("EntityAction", () => {
		it("should have the right values", () => {
			expect(EntityAction.Register).toBe(0);
			expect(EntityAction.Update).toBe(1);
			expect(EntityAction.Resign).toBe(2);
		});
	});
});
