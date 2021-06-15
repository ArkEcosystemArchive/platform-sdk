CREATE TABLE IF NOT EXISTS "pending_blocks" (
     "height" INTEGER NOT NULL,
     "payload" JSONB NOT NULL,

     PRIMARY KEY ("height")
);

CREATE TABLE IF NOT EXISTS "blocks" (
    "height" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,

    PRIMARY KEY ("height")
);

CREATE TABLE IF NOT EXISTS "transactions" (
    "hash" TEXT NOT NULL,
    "block_id" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "amount" BIGINT NOT NULL,
    "fee" BIGINT NOT NULL,

    PRIMARY KEY ("hash"),
    FOREIGN KEY ("block_id") REFERENCES "blocks"("height") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "transaction_parts" (
    "output_hash" TEXT NOT NULL,
    "output_idx" INTEGER NOT NULL,
    "input_hash" TEXT,
    "input_idx" INTEGER,
    "amount" BIGINT NOT NULL,
    "address" JSONB,

    PRIMARY KEY ("output_hash","output_idx"),
    FOREIGN KEY ("output_hash") REFERENCES "transactions"("hash") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "block.hash_unique" ON "blocks"("hash");

CREATE UNIQUE INDEX IF NOT EXISTS "transaction_input_hash_index" ON "transaction_parts" ("input_hash", "input_idx");
