import { ValidationError } from "yup";

export class Validator {
	#error: ValidationError | undefined;

	public validate(data: object, schema: { validateSync: Function }): void {
		this.#error = undefined;

		try {
			// return schema.validateSync(data, { strict: true });
			return schema.validateSync(data);
		} catch (error) {
			if (error instanceof ValidationError) {
				this.#error = error;
			} else {
				throw error;
			}
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
