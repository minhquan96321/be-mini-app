DROP TABLE IF EXISTS "user";
CREATE TABLE IF NOT EXISTS "user" (
	"id"	INTEGER UNIQUE,
	"idByOA"	TEXT(50),
	"name"	TEXT(50),
	"phone"	TEXT(30),
	"avatar"	TEXT(150),
	"isSensitive"	INTEGER,
	"followedOA" INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	UNIQUE("idByOA")
);

