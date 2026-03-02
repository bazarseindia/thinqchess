const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath);

const tournaments = [
    {
        id: crypto.randomUUID(),
        name: "ThinQ Grand Prix: Bangalore Open 2025",
        description: "An AICF-rated rapid chess championship for all age groups. Compete against top-rated players from across Karnataka. Great prizes and trophies await the winners.",
        startDate: new Date("2025-05-15T09:00:00Z").toISOString(),
        endDate: new Date("2025-05-16T18:00:00Z").toISOString(),
        registrationStartDate: new Date("2025-01-01T00:00:00Z").toISOString(),
        registrationEndDate: new Date("2025-05-10T23:59:59Z").toISOString(),
        flyerImage: "/assets/home/Thinq Chess Tournament.jpeg",
        location: "Kanteerava Indoor Stadium, Bangalore",
        isActive: 1, // boolean in sqlite is 0 or 1
        requireKscaId: 1,
        categories: JSON.stringify([
            { id: "u12", name: "Under-12 Championship", fee: 600, slots: 60, min_age: 5, max_age: 12 },
            { id: "u16", name: "Under-16 Elite", fee: 800, slots: 40, min_age: 10, max_age: 16 },
            { id: "open", name: "Open Category", fee: 1200, slots: 100, min_age: 5, max_age: 99 },
        ]),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: crypto.randomUUID(),
        name: "ThinQ Academy Inter-School League",
        description: "Annual inter-school team chess league. Schools compete in a round-robin format to claim the prestigious ThinQ Shield.",
        startDate: new Date("2025-06-20T10:00:00Z").toISOString(),
        endDate: new Date("2025-06-21T17:00:00Z").toISOString(),
        registrationStartDate: new Date("2025-02-01T00:00:00Z").toISOString(),
        registrationEndDate: new Date("2025-06-15T23:59:59Z").toISOString(),
        flyerImage: "/assets/home/Thinq Chess Tournament.jpeg",
        location: "SNN Raj Serenity Club House, Bangalore",
        isActive: 1,
        requireKscaId: 0,
        categories: JSON.stringify([
            { id: "school_primary", name: "Primary (Gr 1-5)", fee: 300, slots: 100, min_age: 5, max_age: 10 },
            { id: "school_middle", name: "Middle (Gr 6-8)", fee: 400, slots: 80, min_age: 11, max_age: 14 },
        ]),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

const stmt = db.prepare(`
    INSERT INTO "Tournament" (id, name, description, startDate, endDate, registrationStartDate, registrationEndDate, flyerImage, location, isActive, requireKscaId, categories, createdAt, updatedAt) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
    // Optional: Clear existing ones for a clean state
    db.prepare('DELETE FROM "Tournament"').run();

    for (const t of tournaments) {
        stmt.run(
            t.id, t.name, t.description, t.startDate, t.endDate, t.registrationStartDate, t.registrationEndDate,
            t.flyerImage, t.location, t.isActive, t.requireKscaId, t.categories, t.createdAt, t.updatedAt
        );
    }
})();

console.log('2 Active Tournaments seeded successfully!');
db.close();
