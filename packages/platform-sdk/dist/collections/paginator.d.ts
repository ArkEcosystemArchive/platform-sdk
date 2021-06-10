import { ClientPaginatorCursor, MetaPagination } from "../services";
export declare abstract class Paginator<T> {
	#private;
	constructor(data: T[], pagination: MetaPagination);
	items(): T[];
	first(): T;
	last(): T;
	previousPage(): ClientPaginatorCursor;
	currentPage(): ClientPaginatorCursor;
	nextPage(): ClientPaginatorCursor;
	lastPage(): ClientPaginatorCursor;
	hasMorePages(): boolean;
	isEmpty(): boolean;
	isNotEmpty(): boolean;
	transform(callback: CallableFunction): void;
	getData(): T[];
	getPagination(): MetaPagination;
}
