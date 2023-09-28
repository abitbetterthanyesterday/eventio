-- CreateTable
CREATE TABLE "GliderBrand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GliderModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "gliderBrandId" INTEGER NOT NULL,
    CONSTRAINT "GliderModel_gliderBrandId_fkey" FOREIGN KEY ("gliderBrandId") REFERENCES "GliderBrand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GliderClass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Glider" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "year" DATETIME NOT NULL,
    "classId" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "modelId" INTEGER NOT NULL,
    CONSTRAINT "Glider_classId_fkey" FOREIGN KEY ("classId") REFERENCES "GliderClass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Glider_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Glider_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "GliderModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gliderId" INTEGER NOT NULL,
    CONSTRAINT "Media_gliderId_fkey" FOREIGN KEY ("gliderId") REFERENCES "Glider" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
