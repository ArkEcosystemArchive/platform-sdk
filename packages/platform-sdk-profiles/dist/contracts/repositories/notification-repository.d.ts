import { Except } from "type-fest";
/**
 * Defines the structure that represents a notification.
 *
 * @export
 * @interface INotification
 */
export interface INotification {
	id: string;
	icon: string;
	name: string;
	body: string;
	type: string;
	action: string;
	read_at?: number;
	meta?: Record<string, any>;
}
/**
 * Defines the implementation contract for the notification repository.
 *
 * @export
 * @interface INotificationRepository
 */
export interface INotificationRepository {
	/**
	 * Get all keys and values.
	 *
	 * @returns {Record<string, INotification>}
	 * @memberof INotificationRepository
	 */
	all(): Record<string, INotification>;
	/**
	 * Get the first notification.
	 *
	 * @returns {INotification}
	 * @memberof INotificationRepository
	 */
	first(): INotification;
	/**
	 * Get the last notification.
	 *
	 * @returns {INotification}
	 * @memberof INotificationRepository
	 */
	last(): INotification;
	/**
	 * Get all keys.
	 *
	 * @returns {string[]}
	 * @memberof INotificationRepository
	 */
	keys(): string[];
	/**
	 * Get all values.
	 *
	 * @returns {INotification[]}
	 * @memberof INotificationRepository
	 */
	values(): INotification[];
	/**
	 * Get a notification for the given key.
	 *
	 * @param {string} key
	 * @returns {INotification}
	 * @memberof INotificationRepository
	 */
	get(key: string): INotification;
	/**
	 * Create a new notification.
	 *
	 * @param {Except<INotification, "id">} value
	 * @returns {INotification}
	 * @memberof INotificationRepository
	 */
	push(value: Except<INotification, "id">): INotification;
	/**
	 * Fill the storage with notification data.
	 *
	 * @param {object} entries
	 * @memberof INotificationRepository
	 */
	fill(entries: object): void;
	/**
	 * Check if the given notification exists.
	 *
	 * @param {string} key
	 * @returns {boolean}
	 * @memberof INotificationRepository
	 */
	has(key: string): boolean;
	/**
	 * Remove the notification for the given ID.
	 *
	 * @param {string} key
	 * @memberof INotificationRepository
	 */
	forget(key: string): void;
	/**
	 * Remove all notifications.
	 *
	 * @memberof INotificationRepository
	 */
	flush(): void;
	/**
	 * Count how many notifications there are.
	 *
	 * @returns {number}
	 * @memberof INotificationRepository
	 */
	count(): number;
	/**
	 * Get all read notifications.
	 *
	 * @returns {INotification[]}
	 * @memberof INotificationRepository
	 */
	read(): INotification[];
	/**
	 * Get all unread notifications.
	 *
	 * @returns {INotification[]}
	 * @memberof INotificationRepository
	 */
	unread(): INotification[];
	/**
	 * Mark the given notification as read.
	 *
	 * @param {string} key
	 * @memberof INotificationRepository
	 */
	markAsRead(key: string): void;
}
