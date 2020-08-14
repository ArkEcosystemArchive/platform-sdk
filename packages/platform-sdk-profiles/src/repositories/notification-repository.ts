import { v4 as uuidv4 } from "uuid";

import { DataRepository } from "./data-repository";

interface Notification {
	icon: string;
	name: string;
	body: string;
	action: string;
	read_at?: number;
}

interface NotificationWithId extends Notification {
	id: string;
}

export class NotificationRepository {
	#data: DataRepository = new DataRepository();

	public all(): Record<string, Notification> {
		return this.#data.all() as Record<string, Notification>;
	}

	public first(): Notification {
		return this.#data.first();
	}

	public last(): Notification {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Notification[] {
		return this.#data.values();
	}

	public get(key: string): NotificationWithId {
		const notification: NotificationWithId | undefined = this.#data.get(key);

		if (!notification) {
			throw new Error(`Failed to find a notification that matches [${key}].`);
		}

		return notification;
	}

	public push(value: Notification): NotificationWithId {
		const id: string = uuidv4();

		this.#data.set(id, { id, ...value });

		return this.get(id);
	}

	public fill(entries: object): void {
		this.#data.fill(entries);
	}

	public has(key: string): boolean {
		return this.#data.has(key);
	}

	public forget(key: string): void {
		this.get(key);

		this.#data.forget(key);
	}

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.keys().length;
	}

	/**
	 * Convenience methods to interact with notifications states.
	 */

	public read(): object {
		return this.values().filter((notification: Notification) => notification.read_at !== undefined);
	}

	public unread(): object {
		return this.values().filter((notification: Notification) => notification.read_at === undefined);
	}

	public markAsRead(key: string): void {
		this.get(key).read_at = +Date.now();
	}
}
