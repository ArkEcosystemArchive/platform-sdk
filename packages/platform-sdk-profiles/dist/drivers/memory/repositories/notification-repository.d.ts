import { Except } from "type-fest";
import { INotification, INotificationRepository, IProfile } from "../../../contracts";
export declare class NotificationRepository implements INotificationRepository {
	#private;
	constructor(profile: IProfile);
	/** {@inheritDoc INotificationRepository.all} */
	all(): Record<string, INotification>;
	/** {@inheritDoc INotificationRepository.first} */
	first(): INotification;
	/** {@inheritDoc INotificationRepository.last} */
	last(): INotification;
	/** {@inheritDoc INotificationRepository.keys} */
	keys(): string[];
	/** {@inheritDoc INotificationRepository.values} */
	values(): INotification[];
	/** {@inheritDoc INotificationRepository.get} */
	get(key: string): INotification;
	/** {@inheritDoc INotificationRepository.push} */
	push(value: Except<INotification, "id">): INotification;
	/** {@inheritDoc INotificationRepository.fill} */
	fill(entries: object): void;
	/** {@inheritDoc INotificationRepository.has} */
	has(key: string): boolean;
	/** {@inheritDoc INotificationRepository.forget} */
	forget(key: string): void;
	/** {@inheritDoc INotificationRepository.flush} */
	flush(): void;
	/** {@inheritDoc INotificationRepository.count} */
	count(): number;
	/**
	 * Convenience methods to interact with notifications states.
	 */
	/** {@inheritDoc INotificationRepository.read} */
	read(): INotification[];
	/** {@inheritDoc INotificationRepository.unread} */
	unread(): INotification[];
	/** {@inheritDoc INotificationRepository.markAsRead} */
	markAsRead(key: string): void;
}
