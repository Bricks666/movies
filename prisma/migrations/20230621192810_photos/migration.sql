-- CreateTable
CREATE TABLE "MoviePhotos" (
    "movieId" INTEGER NOT NULL,
    "path" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MoviePhotos_path_key" ON "MoviePhotos"("path");

-- AddForeignKey
ALTER TABLE "MoviePhotos" ADD CONSTRAINT "MoviePhotos_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
