export class Arr {
	public static randomElement<T>(items: T[]): T {
		return items[Math.floor(Math.random() * items.length)];
	}
}
