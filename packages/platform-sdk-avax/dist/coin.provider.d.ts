import { IoC } from "@arkecosystem/platform-sdk";
export declare class ServiceProvider extends IoC.AbstractServiceProvider implements IoC.IServiceProvider {
	make(container: IoC.Container): Promise<void>;
}
