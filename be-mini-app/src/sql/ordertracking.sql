DROP TABLE IF EXISTS "Ordertracking";

-- 0 hoàn thành
-- 1 đang đến
-- 2 đang duyệt
-- 3 đang chờ
-- 4 hủy
-- 5 đã chụp ảnh
CREATE TABLE IF NOT EXISTS "Ordertracking" (
    "idOrdertracking" INTEGER PRIMARY KEY AUTOINCREMENT,
    "idbookacar" TEXT(20) ,
    "IDdriver" TEXT(50),
    "Orderstatus" INTEGER DEFAULT "2",
    "driverMoney" INTEGER DEFAULT "0",
    "managerMoney" INTEGER DEFAULT "0"
);