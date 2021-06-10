import { Except } from "type-fest";
import { IPlugin, IPluginRepository } from "../../../contracts";
import { PluginRegistry } from "./plugin-registry";
export declare class PluginRepository implements IPluginRepository {
	#private;
	constructor();
	/** {@inheritDoc IPluginRepository.all} */
	all(): Record<string, IPlugin>;
	/** {@inheritDoc IPluginRepository.first} */
	first(): IPlugin;
	/** {@inheritDoc IPluginRepository.last} */
	last(): IPlugin;
	/** {@inheritDoc IPluginRepository.keys} */
	keys(): string[];
	/** {@inheritDoc IPluginRepository.values} */
	values(): IPlugin[];
	/** {@inheritDoc IPluginRepository.push} */
	push(plugin: Except<IPlugin, "id">): IPlugin;
	/** {@inheritDoc IPluginRepository.fill} */
	fill(data: object): void;
	/** {@inheritDoc IPluginRepository.findById} */
	findById(id: string): IPlugin;
	/** {@inheritDoc IPluginRepository.forget} */
	forget(id: string): void;
	/** {@inheritDoc IPluginRepository.flush} */
	flush(): void;
	/** {@inheritDoc IPluginRepository.count} */
	count(): number;
	/** {@inheritDoc IPluginRepository.registry} */
	registry(): PluginRegistry;
}
