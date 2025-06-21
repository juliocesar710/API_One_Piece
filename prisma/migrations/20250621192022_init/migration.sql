-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bounty" INTEGER,
    "crew" TEXT,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
