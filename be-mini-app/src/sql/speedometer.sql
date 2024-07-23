DROP TABLE IF EXISTS "speedometer";
CREATE TABLE IF NOT EXISTS "speedometer" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "IdBookcar" TEXT(20) UNIQUE,
    "SpeedometerStart" TEXT,
    "SpeedometerEnd" TEXT ,
    "currentposition" TEXT
    
);