DROP TABLE IF EXISTS "restaurant";
CREATE TABLE IF NOT EXISTS "restaurant" (
    "idRestaurant" INTEGER PRIMARY KEY AUTOINCREMENT,
    "idUser" TEXT(50),
    "codeRestaurant" TEXT(50) UNIQUE,
    "nameRestaurant" TEXT, 
    "addressRestaurant" TEXT,
    "phoneRestaurant" TEXT(12),
    "commission" INTEGER DEFAULT 0
);