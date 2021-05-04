export interface IPasswordManager {
	get(): string;

	set(password: string): void;

	exists(): boolean;

	forget(): void;
}
