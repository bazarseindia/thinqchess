const BS = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");

const dbPath = path.resolve(__dirname, "prisma", "dev.db");
const db = new BS(dbPath);

function cuid() {
    return "c" + Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

async function seed() {
    console.log("🌱 Seeding database via direct SQLite...\n");

    // 1. Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    db.prepare(`INSERT OR REPLACE INTO AdminUser (id, name, email, password, role, isActive, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`)
        .run("admin-main", "Admin", "admin@thinqchess.com", hashedPassword, "admin", 1);
    console.log("✅ Admin user: admin@thinqchess.com (password: admin123)");

    // 2. Blog Posts
    const blogs = [
        {
            id: "blog-1", title: "5 Opening Principles Every Beginner Must Know",
            slug: "5-opening-principles-every-beginner-must-know",
            content: "<h2>Master the Opening</h2><p>The opening is one of the most critical phases of a chess game. Here are 5 key principles:</p><ol><li><strong>Control the center</strong> — Place pawns and pieces in the center (e4, d4, e5, d5).</li><li><strong>Develop your pieces</strong> — Knights and Bishops should come out early.</li><li><strong>King safety</strong> — Castle early to protect your king.</li><li><strong>Don't move the same piece twice</strong> — Each move should bring a new piece into play.</li><li><strong>Connect your rooks</strong> — Clear the back rank so your rooks can work together.</li></ol><p>Practice these principles in every game and you'll see immediate improvement!</p>",
            excerpt: "Learn the 5 fundamental opening principles that will transform your chess game.",
            category: "Chess Tips", tags: "openings, beginners, strategy", isPublished: 1
        },
        {
            id: "blog-2", title: "How to Improve Your Tactical Vision",
            slug: "how-to-improve-your-tactical-vision",
            content: "<h2>Sharpen Your Tactics</h2><p>Tactics win games! Here's how to improve:</p><ul><li>Solve puzzles daily — aim for 20-30 puzzles per day.</li><li>Study classic tactical patterns — pins, forks, skewers, discovered attacks.</li><li>Analyze your own games — find missed tactical opportunities.</li><li>Play with longer time controls for better calculation.</li></ul><p>Even 15 minutes of daily puzzle-solving dramatically improves tactical awareness.</p>",
            excerpt: "Practical methods to sharpen your tactical vision and spot winning combinations.",
            category: "Training", tags: "tactics, puzzles, improvement", isPublished: 1
        },
        {
            id: "blog-3", title: "Why Chess Is the Perfect Activity for Kids",
            slug: "why-chess-is-perfect-activity-for-kids",
            content: "<h2>Chess & Child Development</h2><p>Chess benefits for children:</p><ul><li><strong>Critical thinking</strong> — Every move requires analysis.</li><li><strong>Patience & focus</strong> — Think before acting.</li><li><strong>Memory improvement</strong> — Pattern recognition strengthens memory.</li><li><strong>Sportsmanship</strong> — Learning to win and lose gracefully.</li><li><strong>Math skills</strong> — Calculation skills transfer to academics.</li></ul><p>At ThinQ Chess Academy, we've seen thousands of children develop these skills. Enroll today!</p>",
            excerpt: "How chess develops critical thinking, focus, and math skills in children.",
            category: "Education", tags: "kids, education, benefits", isPublished: 1
        },
    ];
    const blogStmt = db.prepare(`INSERT OR REPLACE INTO BlogPost (id, title, slug, content, excerpt, category, tags, isPublished, author, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ThinQ Chess', datetime('now'), datetime('now'))`);
    for (const b of blogs) {
        blogStmt.run(b.id, b.title, b.slug, b.content, b.excerpt, b.category, b.tags, b.isPublished);
    }
    console.log("✅ Blog posts: 3 created");

    // 3. Gallery Items
    const galleryCount = db.prepare("SELECT COUNT(*) as c FROM GalleryItem").get().c;
    if (galleryCount === 0) {
        const galleryStmt = db.prepare(`INSERT INTO GalleryItem (id, type, url, caption, category, sortOrder, createdAt)
            VALUES (?, 'image', ?, ?, ?, ?, datetime('now'))`);
        galleryStmt.run(cuid(), "/assets/home/Academy photo.jpeg", "ThinQ Chess Academy Campus", "academy", 1);
        galleryStmt.run(cuid(), "/assets/home/Course completion photo 1.jpeg", "Course Completion Ceremony 2025", "events", 2);
        galleryStmt.run(cuid(), "/assets/home/Internal Tournament.jpeg", "Internal Tournament Action", "tournament", 3);
        galleryStmt.run(cuid(), "/assets/home/Monthly Award.jpeg", "Monthly Award Winners", "events", 4);
        galleryStmt.run(cuid(), "/assets/home/Course completion photo 3.jpeg", "Proud Graduates", "events", 5);
        console.log("✅ Gallery items: 5 created");
    } else {
        console.log("⏭️  Gallery items already exist:", galleryCount);
    }

    // 4. Announcements (SiteContent)
    const announcements = JSON.stringify({
        lines: [
            { text: "Welcome to ThinQ Chess Academy", link: "" },
            { text: "Admissions Open for 2026 Batch — Enroll Now!", link: "/registration" },
            { text: "Upcoming: Bangalore State Open — March 2026", link: "/tournaments" },
            { text: "Call +91-7975820187 for Free Demo", link: "/contact" },
        ],
        visible: true,
    });
    db.prepare(`INSERT OR REPLACE INTO SiteContent (id, key, value, updatedAt)
        VALUES ('sc-topbar', 'top_bar_lines', ?, datetime('now'))`)
        .run(announcements);
    console.log("✅ Announcements: 4 lines set");

    // 5. Sample Contact Message
    const contactCount = db.prepare("SELECT COUNT(*) as c FROM ContactMessage").get().c;
    if (contactCount === 0) {
        db.prepare(`INSERT INTO ContactMessage (id, name, email, phone, subject, message, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`)
            .run(cuid(), "Rahul Sharma", "rahul@example.com", "+919876543210", "Demo Class Inquiry",
                "Hi, I'm interested in enrolling my child for chess classes. Can you share the details?");
        console.log("✅ Sample contact message created");
    }

    // 6. Sample Registration
    const regCount = db.prepare("SELECT COUNT(*) as c FROM Registration").get().c;
    if (regCount === 0) {
        db.prepare(`INSERT INTO Registration (id, classesFor, studentFirstName, studentMiddleName, studentLastName, dob, gender,
            studentEmail, studentPhone, fatherFirstName, fatherLastName, fatherEmail, fatherPhone,
            motherFirstName, motherLastName, motherEmail, motherPhone,
            country, state, city, addressLine1, pincode, mode, coachingCity, preferredCentre, heardFrom,
            createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`)
            .run(cuid(), "Child", "Arjun", "K", "Patel", "2015-03-15", "Male",
                "arjun@example.com", "+919876543211", "Kiran", "Patel", "kiran.patel@example.com", "+919876543212",
                "Priya", "Patel", "priya.patel@example.com", "+919876543213",
                "India", "Karnataka", "Bangalore", "123 MG Road", "560001", "Offline", "Bangalore", "Koramangala", "Google");
        console.log("✅ Sample registration created");
    }

    console.log("\n🎉 Database seeded successfully!");
    console.log("   Login: admin@thinqchess.com / admin123");
}

seed()
    .catch(e => { console.error("❌ Seed failed:", e.message); })
    .finally(() => { db.close(); });
