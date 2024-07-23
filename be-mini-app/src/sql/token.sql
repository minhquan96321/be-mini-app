DROP TABLE IF EXISTS "token";
CREATE TABLE IF NOT EXISTS "token" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "refresh_token" TEXT,
    "access_token" TEXT
);