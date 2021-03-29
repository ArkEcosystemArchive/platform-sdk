import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";
import { INotificationRepository } from "../../../contracts";

import { DataRepository } from "../../../repositories/data-repository";

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

export class NotificationRepository implements INotificationRepository {
	//
}
