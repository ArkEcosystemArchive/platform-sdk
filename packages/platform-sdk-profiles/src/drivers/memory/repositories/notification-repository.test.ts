import "jest-extended";
import "reflect-metadata";
import { bootContainer } from "../../../../test/helpers";
import { State } from "../../../environment/state";
import { Profile } from "../profiles/profile";

import { NotificationRepository } from "./notification-repository";

let subject: NotificationRepository;

const stubNotifications = [
	{
		icon: "warning",
		name: "Ledger Update Available",
		type: "ledger",
		body: "...",
		action: "Read Changelog",
	},
	{
		icon: "warning",
		name: "Ledger Update Available",
		type: "plugin",
		body: "...",
		action: "Read Changelog",
	},
	{
		icon: "info",
		name: "Transaction Created",
		body: "...",
		type: "transaction",
		action: "open",
		meta: {
			txId: "1",
		},
	},
];

const stubNotification = stubNotifications[0];

beforeAll(() => {
	bootContainer();

	const profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	State.profile(profile);
});

beforeEach(() => (subject = new NotificationRepository()));

test("#all", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));
	expect(Object.keys(subject.all())).toHaveLength(stubNotifications.length);
});

test("#first", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));

	expect(subject.keys()).toHaveLength(stubNotifications.length);
	expect(subject.first().name).toEqual(stubNotification.name);
});

test("#last", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));

	expect(subject.keys()).toHaveLength(stubNotifications.length);
	expect(subject.last().name).toEqual(stubNotifications[stubNotifications.length - 1].name);
});

test("#keys", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));
	const keys = Object.keys(subject.all());

	expect(subject.keys()).toEqual(keys);
});

test("#values", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));
	const values = Object.keys(subject.all()).map((id) => subject.get(id));

	expect(subject.values()).toEqual(values);
});

test("#get", () => {
	expect(() => subject.get("invalid")).toThrowError("Failed to find");

	const notification = subject.push(stubNotification);

	expect(subject.get(notification.id)).toBeObject();
});

test("#push", () => {
	expect(subject.keys()).toHaveLength(0);

	subject.push(stubNotification);

	expect(subject.keys()).toHaveLength(1);

	subject.push(stubNotification);

	expect(subject.keys()).toHaveLength(2);
});

test("#fill", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));
	const first = subject.first();
	subject.fill(Object.assign(first, { name: "updated name" }));

	expect(subject.first().name).toEqual("updated name");
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

test("#count", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));

	expect(subject.count()).toEqual(stubNotifications.length);
});

test("marks notifications as read and filters them", () => {
	subject.push(stubNotification);
	subject.markAsRead(subject.push(stubNotification).id);

	expect(subject.read()).toHaveLength(1);
	expect(subject.unread()).toHaveLength(1);
});

test("#read", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));
	subject.markAsRead(subject.first().id);

	expect(subject.unread()).toHaveLength(2);
	expect(subject.first().read_at).toBeTruthy();
});

test("#unread", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));
	subject.markAsRead(subject.first().id);

	expect(subject.unread()).toHaveLength(2);
	expect(subject.first().read_at).toBeTruthy();

	expect(subject.last().read_at).toBeUndefined();
});

it("should have meta info", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));

	const last = stubNotifications[stubNotifications.length - 1];
	expect(subject.last().meta).toBeObject();
	expect(subject.last().meta).toEqual(last.meta);
});

it("should have a type", () => {
	expect(subject.keys()).toHaveLength(0);

	stubNotifications.forEach((n) => subject.push(n));

	const last = stubNotifications[stubNotifications.length - 1];
	expect(subject.last().type).toEqual(last.type);
});
