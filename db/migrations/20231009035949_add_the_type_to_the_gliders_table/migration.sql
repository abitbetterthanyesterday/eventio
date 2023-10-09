/*
  Warnings:

  - Added the required column `type` to the `Glider` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Glider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "year" DATETIME NOT NULL,
    "size" TEXT,
    "class" TEXT NOT NULL,
    "type" TEXT NOT NULL,
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
INSERT INTO "new_Glider" ("class", "createdAt", "description", "hours", "id", "maxWeight", "minWeight", "modelId", "price", "sellerId", "size", "updatedAt", "year") SELECT "class", "createdAt", "description", "hours", "id", "maxWeight", "minWeight", "modelId", "price", "sellerId", "size", "updatedAt", "year" FROM "Glider";
DROP TABLE "Glider";
ALTER TABLE "new_Glider" RENAME TO "Glider";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
