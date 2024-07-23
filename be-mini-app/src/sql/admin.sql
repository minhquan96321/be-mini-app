DROP TABLE IF EXISTS "admin";
CREATE TABLE IF NOT EXISTS "admin" (
    "idAdmin" INTEGER PRIMARY KEY AUTOINCREMENT,
    "email" TEXT(60) UNIQUE,
    "password" TEXT ,
    "nameAdmin" TEXT(50),
    "dateofbirth" TEXT(30),
    "electronicwallet" INTEGER DEFAULT 0
);