const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: "file:" + dbPath });
const p = new PrismaClient({ adapter });

p.adminUser.count()
    .then(c => { console.log("✅ DB connected via adapter! AdminUser count:", c); })
    .catch(e => { console.error("❌ Error:", e.message); })
    .finally(() => p.$disconnect());
