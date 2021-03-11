import { ClientPaginatorCursor, MetaPagination } from "../../contracts/coins/client";

/**
 *
 *
 * @export
 * @abstract
 * @class Paginator
 * @template T
 */
export abstract class Paginator<T> {
	/**
	 *
	 *
	 * @type {T[]}
	 * @memberof Paginator
	 */
	readonly #data: T[];

	/**
	 *
	 *
	 * @type {MetaPagination}
	 * @memberof Paginator
	 */
	readonly #pagination: MetaPagination;

	/**
	 *Creates an instance of Paginator.
	 * @param {T[]} data
	 * @param {MetaPagination} pagination
	 * @memberof Paginator
	 */
	public constructor(data: T[], pagination: MetaPagination) {
		this.#data = data;
		this.#pagination = pagination;
	}

	/**
	 *
	 *
	 * @returns {T[]}
	 * @memberof Paginator
	 */
	public items(): T[] {
		return this.#data;
	}

	/**
	 *
	 *
	 * @returns {T}
	 * @memberof Paginator
	 */
	public first(): T {
		return this.#data[0];
	}

	/**
	 *
	 *
	 * @returns {T}
	 * @memberof Paginator
	 */
	public last(): T {
		return this.#data.reverse()[0];
	}

	/**
	 *
	 *
	 * @returns {ClientPaginatorCursor}
	 * @memberof Paginator
	 */
	public previousPage(): ClientPaginatorCursor {
		return this.#pagination.prev;
	}

	/**
	 *
	 *
	 * @returns {ClientPaginatorCursor}
	 * @memberof Paginator
	 */
	public currentPage(): ClientPaginatorCursor {
		return this.#pagination.self;
	}

	/**
	 *
	 *
	 * @returns {ClientPaginatorCursor}
	 * @memberof Paginator
	 */
	public nextPage(): ClientPaginatorCursor {
		return this.#pagination.next;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Paginator
	 */
	public hasMorePages(): boolean {
		return Boolean(this.nextPage());
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Paginator
	 */
	public isEmpty(): boolean {
		return this.#data === undefined || this.#data.length === 0;
	}

	/**
	 *
	 *
	 * @returns {boolean}
	 * @memberof Paginator
	 */
	public isNotEmpty(): boolean {
		return !this.isEmpty();
	}

	/**
	 *
	 *
	 * @param {CallableFunction} callback
	 * @memberof Paginator
	 */
	public transform(callback: CallableFunction): void {
		for (let i = 0; i < this.#data.length; i++) {
			this.#data[i] = callback(this.#data[i]);
		}
	}

	/**
	 *
	 *
	 * @returns {T[]}
	 * @memberof Paginator
	 */
	public getData(): T[] {
		return this.#data;
	}

	/**
	 *
	 *
	 * @returns {MetaPagination}
	 * @memberof Paginator
	 */
	public getPagination(): MetaPagination {
		return this.#pagination;
	}
}
