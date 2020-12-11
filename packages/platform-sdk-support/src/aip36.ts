import Joi, { ValidationError } from "joi";
import { join } from "path";

import { Business } from "./aip36/business";
import { Delegate } from "./aip36/delegate";
import { Media } from "./aip36/media";
import { Meta } from "./aip36/meta";
import { Module } from "./aip36/module";
import { Plugin } from "./aip36/plugin";
import { Product } from "./aip36/product";
import { SocialMedia } from "./aip36/social-media";
import { SourceControl } from "./aip36/source-control";

export class AIP36 {
	#data: Record<string, unknown> = {};

	public business(): Business {
		return new Business(this.#data);
	}

	public delegate(): Delegate {
		return new Delegate(this.#data);
	}

	public media(): Media {
		return new Media(this.#data);
	}

	public meta(): Meta {
		return new Meta(this.#data);
	}

	public module(): Module {
		return new Module(this.#data);
	}

	public plugin(): Plugin {
		return new Plugin(this.#data);
	}

	public product(): Product {
		return new Product(this.#data);
	}

	public socialMedia(): SocialMedia {
		return new SocialMedia(this.#data);
	}

	public sourceControl(): SourceControl {
		return new SourceControl(this.#data);
	}

	public validate(): void {
		const { error, value } = Joi.object({
			business: Joi.object({
				type: Joi.string().required(),
			}),
			delegate: Joi.object({
				type: Joi.string().valid("public", "private").required(),
				payout: Joi.object({
					frequency: Joi.object({
						type: Joi.string().valid("day", "week", "month", "quarter", "year").required(),
						value: Joi.number().min(1).max(365).required(),
					}),
					percentage: Joi.object({
						min: Joi.number().min(1).max(100).required(),
						max: Joi.number().min(1).max(100).required(),
					}),
				}),
			}),
			images: Joi.array().items(
				Joi.object({
					type: Joi.valid("logo", "image"),
					value: Joi.alternatives().try(
						Joi.string().pattern(/(?:https?:)?\/\/(?:i\.)?(?:imgur\.com)\/([A-z0-9]*)(\.[A-z]{3,4})/),
						Joi.string().pattern(
							/(?:https?:)?\/(?:raw\.githubusercontent\.com)\/([A-Za-z0-9-_.]+)(?:\/[A-z0-9_-].*)(\.(jpe?g|png|gif))$/,
						),
						Joi.string().pattern(
							/(?:https?:)?\/(?:gitlab\.com)\/([A-Za-z0-9-_.].*)(?:\/-\/raw)(?:\/[A-z0-9_-].*)(\.(jpe?g|png|gif))$/,
						),
						Joi.string().pattern(
							/(?:https?:)?\/\/(?:\w+\.)(?:staticflickr\.com)\/([A-z0-9-_]+)(?:\/[A-z0-9_-]+)(\.[A-z]{3,4})/,
						),
					),
				}),
			),
			meta: Joi.object({
				description: Joi.string(),
				displayName: Joi.string(),
				website: Joi.string().uri(),
			}),
			module: Joi.object({
				developedBy: Joi.string().required(),
				network: Joi.string().required(),
				releaseDate: Joi.date().iso().required(),
				platform: Joi.string().required(),
				requirements: Joi.array().items(Joi.string()).required(),
			}),
			plugin: Joi.object({
				developedBy: Joi.string().required(),
				network: Joi.string().required(),
				releaseDate: Joi.date().iso().required(),
				platform: Joi.string().required(),
				requirements: Joi.array().items(Joi.string()).required(),
			}),
			product: Joi.object({
				developedBy: Joi.string().required(),
				network: Joi.string().required(),
				releaseDate: Joi.date().iso().required(),
				platform: Joi.string().required(),
			}),
			socialMedia: Joi.array().items(
				Joi.object({
					type: Joi.valid(
						"discord",
						"facebook",
						"instagram",
						"linkedin",
						"medium",
						"reddit",
						"slack",
						"telegram",
						"twitter",
						"youtube",
					).required(),
					value: Joi.alternatives()
						.try(
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:discord\.com\/invite|discord.gg(\/invite)?)\/([A-z0-9]+)/,
							),
							Joi.string().pattern(/(?:https?:)?\/\/(?:www\.)?(?:facebook\.com)\/([A-Za-z0-9-_.]+)/),
							Joi.string().pattern(/(?:https?:)?\/\/(?:www\.)?(?:instagram\.com)\/([A-Za-z0-9-_.]+)/),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:linkedin\.com)\/(?:in|company)\/([\w\-_À-ÿ%]+)\/?/,
							),
							Joi.string().pattern(/(?:https?:)?\/\/(?:www\.)?(?:medium\.com)\/([A-Za-z0-9-_.@]+)/),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:reddit\.com)\/(?:u(?:ser)?|r)\/([A-z0-9-_]+)\/?/,
							),
							Joi.string().pattern(/(?:https?:)?\/\/(?:[a-z]+)\.(?:slack\.com)/),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:t(?:elegram)?\.me|telegram\.org)\/([a-z0-9_]{5,32})/,
							),
							Joi.string().pattern(/(?:https?:)?\/\/(?:www\.)?(?:twitter\.com)\/@?([A-z0-9_]+)/),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:youtube\.com)\/(?:channel|user)\/([A-z0-9]+)\/?/,
							),
						)
						.required(),
				}),
			),
			sourceControl: Joi.array().items(
				Joi.object({
					type: Joi.valid("bitbucket", "github", "gitlab", "npm").required(),
					value: Joi.alternatives()
						.try(
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:bitbucket\.org)\/([A-Za-z0-9-_.]+)(?:\/[A-z0-9_-]+)?\/?/,
							),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:github\.com)\/([A-Za-z0-9-_.]+)(?:\/[A-z0-9_-]+)?\/?/,
							),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:gitlab\.com)\/([A-Za-z0-9-_.]+)(?:\/[A-z0-9_-]+)?\/?/,
							),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:npmjs\.com)\/package\/([A-Za-z0-9-_.@]+)/,
							),
						)
						.required(),
				}),
			),
			videos: Joi.array().items(
				Joi.object({
					type: Joi.valid("video").required(),
					value: Joi.alternatives()
						.try(
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:www\.)?(?:vimeo\.com|player\.vimeo\.com\/video)\/([0-9]+)/,
							),
							Joi.string().pattern(
								/(?:https?:)?\/\/(?:(?:www\.)?(?:youtube\.com)\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-z0-9-_]+)\/?/,
							),
						)
						.required(),
				}),
			),
		}).validate(this.#data);

		if (error instanceof ValidationError) {
			throw error;
		}

		this.#data = value;
	}

	public toString(): string {
		return JSON.stringify(this.#data);
	}
}
