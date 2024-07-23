DROP TABLE IF EXISTS "user";
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER UNIQUE,
	"idByOA"TEXT(50),
	"idUser" TEXT(50),
	"name"	TEXT(50),
	"phone"	TEXT(30),
	"avatar"	TEXT(150),
	"isSensitive"	INTEGER DEFAULT 0,
	"followedOA" INTEGER DEFAULT 0,
	"isDriver" INTEGER DEFAULT 0,
	"isRestaurant" INTEGER DEFAULT 0,
	"isAdmin" INTEGER DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT),
	UNIQUE("idByOA")
);

