const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath);

const defaultAnnouncements = {
    visible: true,
    lines: [
        { text: 'Upcoming: Bangalore State Open - March 2026', link: '/tournaments' },
        { text: 'New Batch Starting - Enroll Now!', link: '/registration' },
        { text: 'Train the Trainer Program - Applications Open', link: '/train-the-trainer' },
        { text: '15,000+ Young Thinkers & Counting!', link: '' }
    ]
};

const id = crypto.randomUUID();
const key = 'top_bar_lines';
const value = JSON.stringify(defaultAnnouncements);
const now = new Date().toISOString();

const stmt = db.prepare(`
    INSERT INTO "SiteContent" (id, key, value, updatedAt) 
    VALUES (?, ?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET 
        value=excluded.value, 
        updatedAt=excluded.updatedAt
`);

stmt.run(id, key, value, now);

console.log('Top bar seeded explicitly using better-sqlite3 with correct Live values!');
db.close();
