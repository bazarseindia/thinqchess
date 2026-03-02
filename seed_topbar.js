const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultAnnouncements = {
    visible: true,
    lines: [
        { text: 'Welcome to ThinQ Chess Academy', link: '/registration' },
        { text: 'Admissions Open for 2026 Batch — Enroll Now!', link: '/registration' },
        { text: 'Upcoming: Bangalore State Open — March 2026', link: '/tournaments' },
        { text: 'Call +91-7975820187 for Free Demo', link: '/contact' }
    ]
};

async function seed() {
    await prisma.siteContent.upsert({
        where: { key: 'top_bar_lines' },
        update: { value: JSON.stringify(defaultAnnouncements) },
        create: { key: 'top_bar_lines', value: JSON.stringify(defaultAnnouncements), type: 'string' }
    });
    console.log('Top bar seeded!');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
