DROP TABLE IF EXISTS "admin";

CREATE TABLE IF NOT EXISTS "admin" (
    "admin" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nameAdmin" TEXT UNIQUE,
    "address" TEXT UNIQUE,
    "phonenumber" TEXT UNIQUE,
    " positions" TEXT UNIQUE
);