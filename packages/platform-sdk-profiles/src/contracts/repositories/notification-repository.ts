import { Except } from "type-fest";

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

export interface INotificationRepository {
	all(): Record<string, INotification>;
	first(): INotification;
	last(): INotification;
	keys(): string[];
	values(): INotification[];
	get(key: string): INotification;
	push(value: Except<INotification, "id">): INotification;
	fill(entries: object): void;
	has(key: string): boolean;
	forget(key: string): void;
	flush(): void;
	count(): number;
	read(): INotification[];
	unread(): INotification[];
	markAsRead(key: string): void;
}
