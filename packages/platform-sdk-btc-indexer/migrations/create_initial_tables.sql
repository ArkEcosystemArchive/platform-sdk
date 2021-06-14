CREATE TABLE IF NOT EXISTS "pending_block" (
     "height" INTEGER NOT NULL,
     "payload" JSONB NOT NULL,

     PRIMARY KEY ("height")
);

CREATE TABLE IF NOT EXISTS "block" (
    "height" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,

    PRIMARY KEY ("height")
);

CREATE TABLE IF NOT EXISTS "transaction" (
    "hash" TEXT NOT NULL,
    "block_id" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "amount" BIGINT NOT NULL,
    "fee" BIGINT NOT NULL,

    PRIMARY KEY ("hash"),
    FOREIGN KEY ("block_id") REFERENCES "block"("height") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "transaction_part" (
    "output_hash" TEXT NOT NULL,
    "output_idx" INTEGER NOT NULL,
    "input_hash" TEXT,
    "input_idx" INTEGER,
    "amount" BIGINT NOT NULL,
    "address" JSONB,

    PRIMARY KEY ("output_hash","output_idx"),
    FOREIGN KEY ("output_hash") REFERENCES "transaction"("hash") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "block.hash_unique" ON "block"("hash");

CREATE UNIQUE INDEX IF NOT EXISTS "transaction_input_hash_index" ON "transaction_part" ("input_hash", "input_idx");
