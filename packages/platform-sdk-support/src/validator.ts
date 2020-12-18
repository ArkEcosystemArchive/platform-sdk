import Joi from "joi";

export const ValidatorSchema = Joi;

export class Validator {
	#error: Joi.ValidationError | undefined;

	public validate(data: object, schema: Joi.Schema): any {
		const { error, value } = schema.validate(data);

		this.#error = error;

		return value;
	}

	public passes(): boolean {
		return this.#error === undefined;
	}

	public fails(): boolean {
		return !this.passes();
	}

	public errors(): string[] | undefined {
		return this.#error?.details.map((error: Joi.ValidationErrorItem) => error.message);
	}

	public error(): Joi.ValidationError | undefined {
		return this.#error;
	}
}
