-- CreateTable
CREATE TABLE "EntryLocation" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "name" TEXT,
    "placeId" TEXT,
    "visitedAt" TIMESTAMP(3),
    "sequence" INTEGER,
    "raw" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntryLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EntryLocation_entryId_idx" ON "EntryLocation"("entryId");

-- CreateIndex
CREATE INDEX "EntryLocation_visitedAt_idx" ON "EntryLocation"("visitedAt");

-- CreateIndex
CREATE INDEX "EntryLocation_lat_lng_idx" ON "EntryLocation"("lat", "lng");

-- AddForeignKey
ALTER TABLE "EntryLocation" ADD CONSTRAINT "EntryLocation_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
