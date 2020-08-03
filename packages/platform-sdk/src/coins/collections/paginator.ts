import { ClientPaginatorCursor, MetaPagination } from "../../contracts/coins/client";

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

	public previousPage(): ClientPaginatorCursor {
		return this.#pagination.prev;
	}

	public currentPage(): ClientPaginatorCursor {
		return this.#pagination.self;
	}

	public nextPage(): ClientPaginatorCursor {
		return this.#pagination.next;
	}

	public hasMorePages(): boolean {
		return Boolean(this.nextPage());
	}

	public isEmpty(): boolean {
		return this.#data === undefined;
	}

	public isNotEmpty(): boolean {
		return !this.isEmpty();
	}
}
