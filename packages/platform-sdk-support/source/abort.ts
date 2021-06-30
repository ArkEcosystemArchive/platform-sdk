export const abort_if = (condition: boolean, message: string): void => {
	if (condition === true) {
		throw new Error(message);
	}
}

export const abort_unless = (condition: boolean, message: string): void => {
	if (condition === false) {
		throw new Error(message);
	}
}
