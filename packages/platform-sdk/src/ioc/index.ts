import { inject, injectable, postConstruct } from "inversify";

export * from "./container";
export * from "./service-provider";
export * from "./service-provider.contract";

export { inject, injectable, postConstruct };

// @TODO: for some reason this doesn't exist in the 5.1.1 NPM tag even though it shows as included on github
// https://github.com/inversify/InversifyJS/blob/094bcd6e0b1a56ed85ac9b4f66410910075ef4fc/wiki/pre_destroy.md
// https://github.com/inversify/InversifyJS/blob/094bcd6e0b1a56ed85ac9b4f66410910075ef4fc/wiki/deactivation_handler.md
// https://github.com/inversify/InversifyJS/blob/094bcd6e0b1a56ed85ac9b4f66410910075ef4fc/src/annotation/pre_destroy.ts
