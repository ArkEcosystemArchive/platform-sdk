import { ClientPaginatorCursor, MetaPagination } from "../../services";

export abstract class Paginator<T> {
	readonly #data: T[];
	readonly #pagination: MetaPagination;

	public constructor(data: T[], pagination: MetaPagination) {
		this.#data = data;
		this.#pagination = pagination;
	}

	public items(): T[] {
		return this.#data;
	}

	public first(): T {
		return this.#data[0];
	}

	public last(): T {
		return this.#data.reverse()[0];
	}

	public previousPage(): ClientPaginatorCursor {
		return this.#pagination.prev;
	}

	public currentPage(): ClientPaginatorCursor {
		return this.#pagination.self;
	}

	public nextPage(): ClientPaginatorCursor {
		return this.#pagination.next;
	}

	public lastPage(): ClientPaginatorCursor {
		return this.#pagination.last;
	}

	public hasMorePages(): boolean {
		return Boolean(this.nextPage());
	}

	public isEmpty(): boolean {
		return this.#data === undefined || this.#data.length === 0;
	}

	public isNotEmpty(): boolean {
		return !this.isEmpty();
	}

	public transform(callback: CallableFunction): void {
		for (let i = 0; i < this.#data.length; i++) {
			this.#data[i] = callback(this.#data[i]);
		}
	}

	public getData(): T[] {
		return this.#data;
	}

	public getPagination(): MetaPagination {
		return this.#pagination;
	}
}
