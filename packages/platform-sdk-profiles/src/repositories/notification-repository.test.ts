import "jest-extended";

import { NotificationRepository } from "../../src/repositories/notification-repository";

let subject: NotificationRepository;

const stubNotification = {
	icon: "warning",
	name: "Ledger Update Available",
	body: "...",
	action: "Read Changelog",
};

beforeEach(() => (subject = new NotificationRepository()));

test("#push", () => {
	expect(subject.keys()).toHaveLength(0);

	subject.push(stubNotification);

	expect(subject.keys()).toHaveLength(1);

	subject.push(stubNotification);

	expect(subject.keys()).toHaveLength(2);
});

test("#get", () => {
	expect(() => subject.get("invalid")).toThrowError("Failed to find");

	const notification = subject.push(stubNotification);

	expect(subject.get(notification.id)).toBeObject();
});

test("#has", () => {
	const notification = subject.push(stubNotification);

	expect(subject.has(notification.id)).toBeTrue();

	subject.forget(notification.id);

	expect(subject.has(notification.id)).toBeFalse();
});

test("#forget", () => {
	expect(() => subject.forget("invalid")).toThrowError("Failed to find");

	const notification = subject.push(stubNotification);

	subject.forget(notification.id);

	expect(() => subject.get(notification.id)).toThrowError("Failed to find");
});

test("#flush", () => {
	subject.push(stubNotification);
	subject.push(stubNotification);

	expect(subject.keys()).toHaveLength(2);

	subject.flush();

	expect(subject.keys()).toHaveLength(0);
});

test("marks notifications as read and filters them", () => {
	subject.push(stubNotification);
	subject.markAsRead(subject.push(stubNotification).id);

	expect(subject.read()).toHaveLength(1);
	expect(subject.unread()).toHaveLength(1);
});
