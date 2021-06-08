-- CreateTable
CREATE TABLE "PendingBlock" (
    "height" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,

    PRIMARY KEY ("height")
);
