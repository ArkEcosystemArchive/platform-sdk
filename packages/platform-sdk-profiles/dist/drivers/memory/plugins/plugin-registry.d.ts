import { IPluginRegistry, IRegistryPlugin } from "../../../contracts";
export declare class PluginRegistry implements IPluginRegistry {
	#private;
	constructor();
	/** {@inheritDoc IPluginRegistry.all} */
	all(): Promise<IRegistryPlugin[]>;
	/** {@inheritDoc IPluginRegistry.size} */
	size(pkg: IRegistryPlugin): Promise<number>;
	/** {@inheritDoc IPluginRegistry.downloads} */
	downloads(pkg: IRegistryPlugin): Promise<number>;
}
