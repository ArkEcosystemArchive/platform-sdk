#!/usr/bin/env node

const { startDownloaderDaemon, startProcessingDaemon } = require("../distribution");

const { flags } = require("./meow");

// eslint-disable-next-line @typescript-eslint/no-floating-promises
if (flags.downloader) (async () => startDownloaderDaemon(flags))();
else (async () => startProcessingDaemon(flags))();
