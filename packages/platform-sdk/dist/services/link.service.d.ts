import { LinkService } from "./link.contract";
export declare class AbstractLinkService implements LinkService {
	#private;
	private readonly configRepository;
	block(id: string): string;
	transaction(id: string): string;
	wallet(id: string): string;
}
