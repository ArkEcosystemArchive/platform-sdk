import "jest-extended";
import "reflect-metadata";
import { mock, MockProxy } from "jest-mock-extended";

import { ProfileEncrypter } from "./profile.encrypter";
import { IAuthenticator, IProfile, IProfileInput } from "./contracts";
import { AttributeBag } from "./helpers/attribute-bag";

describe("ProfileEncrypter", () => {
	describe("encrypt", () => {
		it("should work with provided password", () => {
			const auth: MockProxy<IAuthenticator> = mock<IAuthenticator>();
			auth.verifyPassword.calledWith("some-pass").mockReturnValue(true);

			const profile: MockProxy<IProfile> = mock<IProfile>();
			profile.auth.mockReturnValue(auth);

			const subject = new ProfileEncrypter(profile);

			expect(subject.encrypt("blah", "some-pass")).toBeString();
		});

		it("should not work with invalid pasword", () => {
			const auth: MockProxy<IAuthenticator> = mock<IAuthenticator>();
			auth.verifyPassword.calledWith("some-pass").mockReturnValue(false);

			const profile: MockProxy<IProfile> = mock<IProfile>();
			profile.auth.mockReturnValue(auth);

			const subject = new ProfileEncrypter(profile);

			expect(() => subject.encrypt("blah", "some-pass")).toThrowError();
		});

		it("should use provided password if available", () => {
			const auth: MockProxy<IAuthenticator> = mock<IAuthenticator>();
			auth.verifyPassword.calledWith("some-pass").mockReturnValue(true);

			const profile: MockProxy<IProfile> = mock<IProfile>();
			profile.password.mockImplementation(() => ({
				get: () => "some-pass",
				set: () => undefined,
				exists: () => true,
				forget: () => undefined,
			}));
			profile.auth.mockReturnValue(auth);

			const subject = new ProfileEncrypter(profile);

			expect(subject.encrypt("blah")).toBeString();
		});
	});

	describe("decrypt", () => {
		it("should work with provided pasword", () => {
			const attributes: AttributeBag<IProfileInput> = new AttributeBag<IProfileInput>();
			attributes.set(
				"data",
				"MGQ4ZDczNmJlYTcwZTE2MmM5YWQ4YWQzNmUyNGNiODg6NzM2MzY1NTczNTZkNGYyZjY5NDE1Njc2Mzc2MTMyMzczNzc4NGM1OTZmNjE2NjZkNTk2NTY5NDU2YTY0NmQ0YTY5NDI3OTZmNzgzMjMxNmQzNTcwNGIzNjc1NTM1OTM5NzAzNDZlNTUzNTMwMzc1NDUxNzg3MzZkMzA3MDU5NjM1MDZkNzQ0YTQ1NzMyZjc5MzI2YjRiMzQ2MTM1NDM1NzUxNmY2MjZhMzk2ODMxNTY1OTM1MzEzOTY1NjM3NDU2MzQzMzc2NzAzMDM4NGY0YjMwNTE1YTU4NTY1NTYxNGE3YTMxNDI0ZjJiMmYyZjQ0NmUzNDZmNzE1NzRmNDY2NDM1NzU3MzZhMzY0YTY0NmMyYjUzNGU1ODUxNGI3NDQ4MmIzODUzNzg2YjQzNTc2MjczNDgzMzY2Mzg1OTYxNjg3OTQ3NzM1MzUyNTAzMzY5NTU2ZjRkMmY3NTU5NTI2MTM3NTQ3YTcxNGE0YTM1NzY2ZjRhNTY2YTQ5NDQzMDU1NGU0Njc1NmE0MTZmNjM1OTZkNjI0NTUxNmMyZjZjMzQ2YTUxNmM1YTRlNzUzNTY1Mzk3NjQ5NjUzOTQyNzM3NzQxNmM0MTUzNTg0YzU1NzI2ODQzNjY2ZjMzNTg1NzJiNzUzMzQ5NmQ2ZDM5NjQ1NjU1NzQ2NzQ5NjEzMjUyNmE2YzY5NzM0NjM2NjU1NTRjNDc0NjdhNGU2MzQ1NDc0NjU3NTgzNTQ1MzI3OTUxNGY2ZjZlNzg1NzU3NjczNTRjNTg0ZjM4NDQyYjMzNjM3MDYyNTc2ODQxNGU3MTM5NjU3NzJmNTA0NTc1NzA0YzYzMzQ0Njc0MzMzNDc5NDI2YzRhMmY0NDYyNTU3NzRlNTI0ZjU3MzUzNDY1NzY2NTU2Mzg2ODQ4NDc0ODY0NTk2NjcwNjYzMzMwNmU1MjJmNGU0MjM0NDE3NTczMzI2ZDdhMzY0NDY4NDE0MTdhNjE1ODU3MzI3NzZhNDQ2OTY1NTg2NDcxNmQ0MjYzNjQ3MDM4NDczODZmMzY1MTU1NDI2YjQ2NTk1ODMzNGIzNjU0NmQ2MTc2NDE0ZjUxNDE0YTcxNmY0YjQ5NzA0ZjZmNDE0ODMwNGYzMzUyNzEzMTRhNDE3NjM0Njc2MzM5NzU1MjQzNDU3MTYzNzE0YTYxNGEzNTc4NWE0ZjZiNGEzMjUxNzk0ODUzNjQ1NTQ2NmU2ZjUwNDk2ZTM0NmE1MDQ0Nzk0ODM2NzY3MDY2NTg3MjU0NDQ3NTc5NDQ1OTRkNzM0MTMxMmI0NTY1NjQ3NTZhNDI2MzM5Mzk0YjY0NTA2ZDMwNGM3NDRkNDQ1NzRmNDY1NTQzNTU0OTc3NTU0MjQxMzY0ZjU2Njc2NDcyNDcyYjc3NjY2YTUxNjEzMzMxMzE1NzZmNDU2YTYyNDI0MzM1Njc1NDRiNjI1NzQ5Njg1NTQzNGQ2MjQzNWE0NzM3NjE0YTc4NTc2MjQ5MzQ2Yzc1MzI2MTQ1NTAzMDJiNzQ0NTUyNWE2NDcyNmQyYjc5MzA2NzcyMmIzNDVhNzc3NjRkNzk2OTc3NGE1ODJmNGU0ZDYzNDM2ZDQ1NjI1OTJmMzE1NjdhNDE1MzMwNDg2MzUyNTY3NTY0MzcyYjY5NTc2YjM5NmQyYjczNGI2YzZjNzc2Zjc4NTA1ODQzMzg1MTZlNGI0YzRjNDU2NDUzNjE3NDM1NmQ2YzZjNjg1MTY1Nzk2MzJiNzE0MjQ1NTI1NDQ4NTkzZA==",
			);

			const profile: MockProxy<IProfile> = mock<IProfile>();
			profile.usesPassword.mockReturnValue(true);
			profile.getAttributes.mockReturnValue(attributes);

			const subject = new ProfileEncrypter(profile);

			const decrypted = subject.decrypt("some-pass");
			expect(decrypted.id).toBe("5108f38f-5000-4043-bc25-fd9e7fb323d8");
		});

		it("should failed if profile is not encrypted", () => {
			const profile: MockProxy<IProfile> = mock<IProfile>();
			profile.usesPassword.mockReturnValue(false);

			const subject = new ProfileEncrypter(profile);

			expect(() => subject.decrypt("some-pass")).toThrowError();
		});
	});
});
