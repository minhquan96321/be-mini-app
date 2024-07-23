DROP TABLE IF EXISTS "driver";
-- 0 Đang rảnh
-- 1 đã có đơn
-- 2 đã từng làm tài xế
CREATE TABLE IF NOT EXISTS "driver" (
    "iddriver" INTEGER PRIMARY KEY AUTOINCREMENT,
    "idUser" TEXT(50),
    "address" TEXT,
    "IDcard" INTEGER,
    "Faceimage" TEXT DEFAULT NULL,
    "nameDriver" TEXT,
    "email" TEXT,
    "phoneDriver" TEXT,
    "DriverStatus" INTEGER DEFAULT "0" 
);