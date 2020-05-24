export class Arr {
	public static randomElement(items: any[]) {
		return items[Math.floor(Math.random() * items.length)];
	}
}
