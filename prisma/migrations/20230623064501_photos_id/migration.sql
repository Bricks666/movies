-- DropIndex
DROP INDEX "MoviePhotos_path_key";

-- AlterTable
ALTER TABLE "MoviePhotos" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MoviePhotos_pkey" PRIMARY KEY ("id");
