"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class ProfileValidator {
	/**
	 * Validate the profile data.
	 *
	 * @param {IProfileData} [data]
	 * @return {Promise<IProfileData>}
	 * @memberof Profile
	 */
	validate(data) {
		// @TODO: adjust schemas for manifest changes
		const { error, value } = joi_1.default
			.object({
				id: joi_1.default.string().required(),
				contacts: joi_1.default.object().pattern(
					joi_1.default.string().uuid(),
					joi_1.default.object({
						id: joi_1.default.string().required(),
						name: joi_1.default.string().required(),
						addresses: joi_1.default.array().items(
							joi_1.default.object({
								id: joi_1.default.string().required(),
								coin: joi_1.default.string().required(),
								network: joi_1.default.string().required(),
								address: joi_1.default.string().required(),
							}),
						),
						starred: joi_1.default.boolean().required(),
					}),
				),
				// TODO: stricter validation to avoid unknown keys or values
				data: joi_1.default.object().required(),
				// TODO: stricter validation to avoid unknown keys or values
				notifications: joi_1.default.object().required(),
				// TODO: stricter validation to avoid unknown keys or values
				peers: joi_1.default.object().required(),
				// TODO: stricter validation to avoid unknown keys or values
				plugins: joi_1.default.object().required(),
				// TODO: stricter validation to avoid unknown keys or values
				settings: joi_1.default.object().required(),
				wallets: joi_1.default.object().pattern(
					joi_1.default.string().uuid(),
					joi_1.default.object({
						id: joi_1.default.string().required(),
						data: joi_1.default.object().required(),
						settings: joi_1.default.object().required(),
					}),
				),
			})
			.validate(data, { stripUnknown: true, allowUnknown: true });
		if (error !== undefined) {
			throw error;
		}
		return value;
	}
}
exports.ProfileValidator = ProfileValidator;
//# sourceMappingURL=profile.validator.js.map
