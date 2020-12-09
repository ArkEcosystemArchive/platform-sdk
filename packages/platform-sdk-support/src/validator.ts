// @ts-ignore - Cannot find module 'yup' or its corresponding type declarations.
import { ValidationError } from "yup";

export * as ValidatorSchema from "yup";

export class Validator {
	#error: ValidationError | undefined;

	public validate(data: object, schema: { validateSync: Function }, validationOptions?: object): any {
		this.#error = undefined;

		try {
			return schema.validateSync(data, validationOptions);
		} catch (error) {
			this.#error = error;
		}
	}

	public passes(): boolean {
		return this.#error === undefined;
	}

	public fails(): boolean {
		return !this.passes();
	}

	public errors(): string[] | undefined {
		return this.#error?.errors;
	}

	public error(): ValidationError | undefined {
		return this.#error;
	}
}
