-- CreateTable
CREATE TABLE "Block" (
    "height" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,

    PRIMARY KEY ("height")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "hash" TEXT NOT NULL,
    "blockId" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "amount" BIGINT NOT NULL,
    "fee" BIGINT NOT NULL,

    PRIMARY KEY ("hash")
);

-- CreateTable
CREATE TABLE "TransactionPart" (
    "output_hash" TEXT NOT NULL,
    "output_idx" INTEGER NOT NULL,
    "input_hash" TEXT,
    "input_idx" INTEGER,
    "amount" BIGINT NOT NULL,
    "address" JSONB,

    PRIMARY KEY ("output_hash","output_idx")
);

-- CreateIndex
CREATE UNIQUE INDEX "Block.hash_unique" ON "Block"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_input_hash_index" ON "TransactionPart"("input_hash", "input_idx");

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("blockId") REFERENCES "Block"("height") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionPart" ADD FOREIGN KEY ("output_hash") REFERENCES "Transaction"("hash") ON DELETE CASCADE ON UPDATE CASCADE;
