// Optimize svg (using svgo)
const svgo = require("svgo");

export default async (source: string): Promise<string> => {
    return (await svgo.optimize(source, {
        plugins: svgo.extendDefaultPlugins([
            "sortAttrs",
            "removeDimensions",
            { name: "removeViewBox", active: false },
            { name: "cleanupIDs", params: { preservePrefixes: ["name:"] } },
        ]),
    })).data;
}
