-- CreateTable
CREATE TABLE "IntegralWellbeing" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "physicalEnergy" INTEGER NOT NULL,
    "emotionalState" INTEGER NOT NULL,
    "notes" VARCHAR(100),
    "exercise" BOOLEAN NOT NULL DEFAULT false,
    "hydration" BOOLEAN NOT NULL DEFAULT false,
    "sleep" BOOLEAN NOT NULL DEFAULT false,
    "nutrition" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntegralWellbeing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IntegralWellbeing_userId_date_idx" ON "IntegralWellbeing"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "IntegralWellbeing_userId_date_key" ON "IntegralWellbeing"("userId", "date");
