DROP TABLE IF EXISTS "Ordertracking";

-- 0 đến
-- 1 hoành thành
-- 2 đang đến
-- 3 Hủy
CREATE TABLE IF NOT EXISTS "Ordertracking" (
    "idOrdertracking" INTEGER PRIMARY KEY AUTOINCREMENT,
    "idbookacar" INTEGER UNIQUE,
    "IDdriver" INTEGER,
    "Orderstatus" INTEGER DEFAULT "2"
);