-- CreateTable
CREATE TABLE "PendingBlock" (
    "height" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    PRIMARY KEY ("height")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingBlock.hash_unique" ON "PendingBlock"("hash");
