import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";
import { INotification, INotificationRepository } from "../../../contracts";
import { injectable } from "inversify";

import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class NotificationRepository implements INotificationRepository {
	#data: DataRepository = new DataRepository();

	public all(): Record<string, INotification> {
		return this.#data.all() as Record<string, INotification>;
	}

	public first(): INotification {
		return this.#data.first();
	}

	public last(): INotification {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): INotification[] {
		return this.#data.values();
	}

	public get(key: string): INotification {
		const notification: INotification | undefined = this.#data.get(key);

		if (!notification) {
			throw new Error(`Failed to find a notification that matches [${key}].`);
		}

		return notification;
	}

	public push(value: Except<INotification, "id">): INotification {
		const id: string = uuidv4();

		this.#data.set(id, { id, ...value });

		emitProfileChanged();

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

		emitProfileChanged();
	}

	public flush(): void {
		this.#data.flush();

		emitProfileChanged();
	}

	public count(): number {
		return this.keys().length;
	}

	/**
	 * Convenience methods to interact with notifications states.
	 */

	public read(): INotification[] {
		return this.values().filter((notification: INotification) => notification.read_at !== undefined);
	}

	public unread(): INotification[] {
		return this.values().filter((notification: INotification) => notification.read_at === undefined);
	}

	public markAsRead(key: string): void {
		this.get(key).read_at = +Date.now();

		emitProfileChanged();
	}
}
