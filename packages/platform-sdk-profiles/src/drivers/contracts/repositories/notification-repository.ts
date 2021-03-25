import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";

import { DataRepository } from "./data-repository";

interface Notification {
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
    all(): Record<string, Notification>;
    first(): Notification;
    last(): Notification;
    keys(): string[];
    values(): Notification[];
    get(key: string): Notification;
    push(value: Except<Notification, "id">): Notification;
    fill(entries: object): void;
    has(key: string): boolean;
    forget(key: string): void;
    flush(): void;
    count(): number;
    read(): Notification[];
    unread(): Notification[];
    markAsRead(key: string): void;
}
