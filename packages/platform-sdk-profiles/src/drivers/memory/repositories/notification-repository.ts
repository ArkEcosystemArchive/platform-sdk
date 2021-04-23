import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";
import { INotification, INotificationRepository } from "../../../contracts";
import { injectable } from "inversify";

import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class NotificationRepository implements INotificationRepository {
	#data: DataRepository = new DataRepository();

	/** {@inheritDoc IWalletFactory.generate} */
	public all(): Record<string, INotification> {
		return this.#data.all() as Record<string, INotification>;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public first(): INotification {
		return this.#data.first();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public last(): INotification {
		return this.#data.last();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public values(): INotification[] {
		return this.#data.values();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public get(key: string): INotification {
		const notification: INotification | undefined = this.#data.get(key);

		if (!notification) {
			throw new Error(`Failed to find a notification that matches [${key}].`);
		}

		return notification;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public push(value: Except<INotification, "id">): INotification {
		const id: string = uuidv4();

		this.#data.set(id, { id, ...value });

		emitProfileChanged();

		return this.get(id);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public fill(entries: object): void {
		this.#data.fill(entries);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public has(key: string): boolean {
		return this.#data.has(key);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public forget(key: string): void {
		this.get(key);

		this.#data.forget(key);

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public count(): number {
		return this.keys().length;
	}

	/**
	 * Convenience methods to interact with notifications states.
	 */

	/** {@inheritDoc IWalletFactory.generate} */
	public read(): INotification[] {
		return this.values().filter((notification: INotification) => notification.read_at !== undefined);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public unread(): INotification[] {
		return this.values().filter((notification: INotification) => notification.read_at === undefined);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public markAsRead(key: string): void {
		this.get(key).read_at = +Date.now();

		emitProfileChanged();
	}
}
