import { ConfigRepository } from "../coins";
import { Container } from "./container";
import { ServiceList } from "./service-provider.contract";
export declare abstract class AbstractServiceProvider {
	protected readonly configRepository: ConfigRepository;
	protected compose(services: ServiceList, container: Container): Promise<void>;
}
