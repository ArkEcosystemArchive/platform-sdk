import "./initialize";
import optimize from "./optimize-svg";
import { readFileSync, writeFileSync } from "fs";
import { posix } from "path";

(async () => {
    try {
        const path: string = posix.relative("", `${__dirname}/..`) || ".";
        const template: string = readFileSync(`${path}/assets/banner.svg`).toString();
        const optimized = await optimize(template);
        writeFileSync(`${path}/assets/banner.svg`, optimized);
    }
    catch (e) {
        console.log(e);
    }
})();
