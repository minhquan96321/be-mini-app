DROP TABLE IF EXISTS "bookcar";

CREATE TABLE IF NOT EXISTS "bookcar" (
    "idbookcars" INTEGER PRIMARY KEY AUTOINCREMENT,
    "idboo" TEXT(20) ,
    "recordid" TEXT,
    "iduser" TEXT(50) ,
    "idrestaurant"  TEXT(50) DEFAULT 0,
    "addressStart" TEXT,
    "addressEnd" TEXT,
    "vehicletype" TEXT,
    "Paymentmethods" TEXT,
    "SumPayable" INTEGER,
    "CreateDate" TEXT
);