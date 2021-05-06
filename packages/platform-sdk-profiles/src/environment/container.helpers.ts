import { container } from "./container";

export const resolve = <T>(key: string): T => container.get(key);
