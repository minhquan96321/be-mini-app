DROP TABLE IF EXISTS "electronicwallet";
CREATE TABLE IF NOT EXISTS "electronicwallet" (
    "idwallet" INTEGER PRIMARY KEY AUTOINCREMENT,
    "walletcode" TEXT UNIQUE,
    "idDriver" TEXT(50),
    "totalamount" INTEGER DEFAULT 0
);