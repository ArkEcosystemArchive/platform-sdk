import { Container } from "../environment/container";
import { EnvironmentOptions } from "../environment/env.models";

export interface Driver {
	make(container: Container, options: EnvironmentOptions): void;
}
