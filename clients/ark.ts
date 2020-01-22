import { Client } from './contracts'
import { Block, Transaction, Wallet } from "../dtos";

export class ArkClient implements Client {
    public getBlock(id: string): Block {
        return new Block({ id: 1, height: 1 });
    }

    public getBlocks(): Block[] {
        return [
            new Block({ id: 1, height: 1 }),
            new Block({ id: 2, height: 2 }),
            new Block({ id: 3, height: 3 }),
        ];
    }

    public getTransaction(id: string): Transaction {
        return new Transaction({ id: 1, amount: 1 });
    }

    public getTransactions(): Transaction[] {
        return [
            new Transaction({ id: 1, amount: 1 }),
            new Transaction({ id: 2, amount: 2 }),
            new Transaction({ id: 3, amount: 3 }),
        ];
    }

    public getWallet(id: string): Wallet {
        return new Wallet({ address: 1, publicKey: 1 });
    }

    public getWallets(): Wallet[] {
        return [
            new Wallet({ address: 1, publicKey: 1 }),
            new Wallet({ address: 2, publicKey: 2 }),
            new Wallet({ address: 3, publicKey: 3 }),
        ];
    }
}
