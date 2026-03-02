const Database = require('better-sqlite3');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new Database(dbPath);

const defaults = [
    { key: 'vid_home_intro', value: '/assets/home/copy_9921C4CB-1E56-4593-8898-3B2A91782E5C.mov' },
    { key: 'img_home_hero_bg', value: '/assets/home/Internal Tournament.jpeg' },
    { key: 'img_nav_foundation', value: '/assets/home/Course completion photo 1.jpeg' },
    { key: 'img_nav_intermediate', value: '/assets/home/Internal Tournament.jpeg' },
    { key: 'img_nav_advanced', value: '/assets/home/Academy photo.jpeg' },
    { key: 'img_nav_professional', value: '/assets/home/Practice time.jpeg' },
    { key: 'img_nav_offline', value: '/assets/home/Academy photo.jpeg' },
    { key: 'img_btn_play_fun', value: '/assets/home/Course completion photo 1.jpeg' },
    { key: 'img_btn_tournaments', value: '/assets/home/Internal Tournament.jpeg' },
    { key: 'img_btn_trainer', value: '/assets/home/Academy photo.jpeg' },
    { key: 'img_btn_elite', value: '/assets/home/Practice time.jpeg' },
    { key: 'img_home_philosophy', value: '/assets/home/Practice time.jpeg' },
    { key: 'img_programs_bg', value: '/assets/home/Practice time.jpeg' },
    { key: 'img_services_bg', value: '/assets/home/Practice time.jpeg' },
    { key: 'img_free_trial_bg', value: '/assets/home/Practice time.jpeg' },
    { key: 'img_registration_bg', value: '/assets/home/Thinq Chess Tournament.jpeg' },
    { key: 'img_train_trainer_bg', value: '/images/contact-bg.jpg' }
];

const stmt = db.prepare(`
    INSERT INTO "SiteContent" (id, key, value, updatedAt) 
    VALUES (?, ?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET 
        value=excluded.value, 
        updatedAt=excluded.updatedAt
`);

const now = new Date().toISOString();

db.transaction(() => {
    for (const item of defaults) {
        const id = crypto.randomUUID();
        const fullKey = 'site_media_' + item.key;
        stmt.run(id, fullKey, item.value, now);
    }
})();

console.log('Site images successfully seeded to the database!');
db.close();
