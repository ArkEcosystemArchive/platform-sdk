import "./initialize";
import { posix } from "path";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";

(() => {
    if (process.argv.length != 4) {
        console.log("Banner generator");
        console.log("USAGE: yarn run generate-banner <CoinName> <CoinSymbol>");
        console.log("# Creates ../platform-sdk-<CoinSymbol>/banner.png with <CoinName>");
        return;
    }
    try {
        const path: string = posix.relative("", `${__dirname}/..`) || ".";
        const root: string = posix.relative("", `${path}/..`) || ".";
        const parameters: readonly string[] = process.argv.slice(2);
        const template: string = readFileSync(`${path}/assets/banner.svg`).toString();
        const content = template.replace("CoinName", parameters[0]);
        const svg = `${root}/platform-sdk-${parameters[1].toLowerCase()}/banner.svg`;
        const png = svg.replace(".svg", ".png");
        writeFileSync(svg, content);
        execSync(`yarn dlx -q svgexport ${svg} ${png}`, { stdio: "pipe" });
        unlinkSync(svg);
    }
    catch (e) {
        console.log(e);
    }
})();
