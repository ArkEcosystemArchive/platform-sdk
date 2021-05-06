import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";
import { INotification, INotificationRepository, IProfile } from "../../../contracts";
import { injectable } from "inversify";

import { DataRepository } from "../../../repositories/data-repository";
import { emitProfileChanged } from "../helpers";

@injectable()
export class NotificationRepository implements INotificationRepository {
	readonly #profile: IProfile;
	#data: DataRepository = new DataRepository();

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc INotificationRepository.all} */
	public all(): Record<string, INotification> {
		return this.#data.all() as Record<string, INotification>;
	}

	/** {@inheritDoc INotificationRepository.first} */
	public first(): INotification {
		return this.#data.first();
	}

	/** {@inheritDoc INotificationRepository.last} */
	public last(): INotification {
		return this.#data.last();
	}

	/** {@inheritDoc INotificationRepository.keys} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc INotificationRepository.values} */
	public values(): INotification[] {
		return this.#data.values();
	}

	/** {@inheritDoc INotificationRepository.get} */
	public get(key: string): INotification {
		const notification: INotification | undefined = this.#data.get(key);

		if (!notification) {
			throw new Error(`Failed to find a notification that matches [${key}].`);
		}

		return notification;
	}

	/** {@inheritDoc INotificationRepository.push} */
	public push(value: Except<INotification, "id">): INotification {
		const id: string = uuidv4();

		this.#data.set(id, { id, ...value });

		emitProfileChanged(this.#profile);

		return this.get(id);
	}

	/** {@inheritDoc INotificationRepository.fill} */
	public fill(entries: object): void {
		this.#data.fill(entries);
	}

	/** {@inheritDoc INotificationRepository.has} */
	public has(key: string): boolean {
		return this.#data.has(key);
	}

	/** {@inheritDoc INotificationRepository.forget} */
	public forget(key: string): void {
		this.get(key);

		this.#data.forget(key);

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc INotificationRepository.flush} */
	public flush(): void {
		this.#data.flush();

		emitProfileChanged(this.#profile);
	}

	/** {@inheritDoc INotificationRepository.count} */
	public count(): number {
		return this.keys().length;
	}

	/**
	 * Convenience methods to interact with notifications states.
	 */

	/** {@inheritDoc INotificationRepository.read} */
	public read(): INotification[] {
		return this.values().filter((notification: INotification) => notification.read_at !== undefined);
	}

	/** {@inheritDoc INotificationRepository.unread} */
	public unread(): INotification[] {
		return this.values().filter((notification: INotification) => notification.read_at === undefined);
	}

	/** {@inheritDoc INotificationRepository.markAsRead} */
	public markAsRead(key: string): void {
		this.get(key).read_at = +Date.now();

		emitProfileChanged(this.#profile);
	}
}
