-- CreateTable
CREATE TABLE "Rating" (
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "mark" SMALLINT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("movieId","userId")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
