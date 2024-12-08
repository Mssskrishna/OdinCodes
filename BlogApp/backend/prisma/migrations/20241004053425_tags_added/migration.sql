-- AlterTable
CREATE SEQUENCE comments_id_seq;
ALTER TABLE "Comments" ALTER COLUMN "id" SET DEFAULT nextval('comments_id_seq');
ALTER SEQUENCE comments_id_seq OWNED BY "Comments"."id";

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "blogId" INTEGER,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
