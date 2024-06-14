DROP TABLE IF EXISTS "role";

CREATE TABLE IF NOT EXISTS "role" (
    "idrole" INTEGER PRIMARY KEY AUTOINCREMENT,
    "idByOA" TEXT(50) ,
    "drivinglicense" TEXT,  
    "address" TEXT,
    "IDcard" INTEGER,
    "Faceimage" TEXT,
    "IDcardfront" TEXT,
    "BacksideofIDcard" TEXT,
    "Username" TEXT
);