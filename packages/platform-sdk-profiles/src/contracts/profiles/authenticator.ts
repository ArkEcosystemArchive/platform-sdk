export interface IAuthenticator {
	setPassword(password: string): void;
	verifyPassword(password: string): boolean;
	changePassword(oldPassword: string, newPassword: string): void;
}
