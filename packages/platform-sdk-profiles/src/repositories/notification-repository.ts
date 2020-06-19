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
	#storage: DataRepository = new DataRepository();

	public all(): object {
		return this.#storage.all();
	}

	public keys(): string[] {
		return this.#storage.keys();
	}

	public values(): Notification[] {
		return this.#storage.values();
	}

	public get(key: string): NotificationWithId {
		const notification: NotificationWithId | undefined = this.#storage.get(key);

		if (!notification) {
			throw new Error(`Failed to find a notification that matches [${key}].`);
		}

		return notification;
	}

	public push(value: Notification): NotificationWithId {
		const id: string = uuidv4();

		this.#storage.set(id, { id, ...value });

		return this.get(id);
	}

	public fill(entries: object): void {
		this.#storage.fill(entries);
	}

	public has(key: string): boolean {
		return this.#storage.has(key);
	}

	public forget(key: string): void {
		this.get(key);

		this.#storage.forget(key);
	}

	public flush(): void {
		this.#storage.flush();
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
