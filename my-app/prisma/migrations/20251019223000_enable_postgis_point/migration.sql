-- Enable PostGIS extension (safe to run if not exists)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add geography(Point,4326) column and GIST index for fast geospatial queries
ALTER TABLE "EntryLocation"
  ADD COLUMN IF NOT EXISTS "coordinates" geography(Point, 4326);

-- Backfill coordinates from lat/lng if available
UPDATE "EntryLocation"
SET "coordinates" = ST_SetSRID(ST_MakePoint("lng", "lat"), 4326)::geography
WHERE "coordinates" IS NULL AND "lat" IS NOT NULL AND "lng" IS NOT NULL;

-- Index for radius/nearest queries
CREATE INDEX IF NOT EXISTS "EntryLocation_coordinates_gix"
  ON "EntryLocation"
  USING GIST ("coordinates");
