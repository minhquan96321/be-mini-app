DROP TABLE IF EXISTS "bookcar";

CREATE TABLE IF NOT EXISTS "bookcar" (
    "idboo" INTEGER PRIMARY KEY AUTOINCREMENT,
    "userid" TEXT(50) ,
    "idrestaurant" INTEGER DEFAULT 0,
    "addressStart" TEXT,
    "addressEnd" TEXT,
    "vehicletype" TEXT,
    "Paymentmethods" TEXT,
    "SumPayable" INTEGER
);