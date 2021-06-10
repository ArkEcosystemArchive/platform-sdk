import { HttpClient } from "@arkecosystem/platform-sdk-http";
import sqlite3 from "better-sqlite3";
export declare const useDatabase: (flags: { coin: string; network: string; database: string }) => sqlite3.Database;
export declare const useLogger: () => Console;
export declare const useClient: (host: string) => HttpClient;
