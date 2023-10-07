/*
  Warnings:

  - You are about to drop the `GliderClass` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `classId` on the `Glider` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Glider` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `gliderBrandId` on the `GliderModel` table. All the data in the column will be lost.
  - Added the required column `class` to the `Glider` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GliderClass";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Glider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "year" DATETIME NOT NULL,
    "size" TEXT,
    "class" TEXT NOT NULL,
    "minWeight" INTEGER,
    "maxWeight" INTEGER,
    "hours" INTEGER,
    "description" TEXT,
    "sellerId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    CONSTRAINT "Glider_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Glider_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "GliderModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Glider" ("createdAt", "description", "hours", "id", "modelId", "price", "sellerId", "size", "updatedAt", "year") SELECT "createdAt", "description", "hours", "id", "modelId", "price", "sellerId", "size", "updatedAt", "year" FROM "Glider";
DROP TABLE "Glider";
ALTER TABLE "new_Glider" RENAME TO "Glider";
CREATE TABLE "new_GliderModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    CONSTRAINT "GliderModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "GliderBrand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GliderModel" ("brandId", "id", "name") SELECT "brandId", "id", "name" FROM "GliderModel";
DROP TABLE "GliderModel";
ALTER TABLE "new_GliderModel" RENAME TO "GliderModel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
