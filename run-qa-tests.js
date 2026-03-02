const puppeteer = require('puppeteer');
const fs = require('fs');

const BROWSER_PORT = 3000;
const BASE_URL = `http://localhost:${BROWSER_PORT}`;

// We will test key pages from our QA checklist
const pagesToTest = [
    // Frontend
    { url: '/', name: 'Home' },
    { url: '/about', name: 'About' },
    { url: '/blog', name: 'Blog' },
    { url: '/contact', name: 'Contact' },
    { url: '/faqs', name: 'FAQs' },
    { url: '/free-trial', name: 'Free-Trial' },
    { url: '/gallery', name: 'Gallery' },
    { url: '/programs', name: 'Programs' },
    { url: '/registration', name: 'Registration' },
    { url: '/services', name: 'Services' },
    { url: '/testimonials', name: 'Testimonials' },
    { url: '/tournaments', name: 'Tournaments' },
    { url: '/train-the-trainer', name: 'Train-Trainer' },
    // Admin (Unauthenticated redirect test)
    { url: '/admin', name: 'Admin-Redirect-Test' },
    { url: '/admin/login', name: 'Admin-Login' },
];

(async () => {
    console.log("🚀 Starting Automated QA Testing...");

    if (!fs.existsSync("qa-reports")) fs.mkdirSync("qa-reports");

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let reportMd = "# QA Automated Test Report\n\n";
    let passed = 0;
    let failed = 0;

    for (const pageInfo of pagesToTest) {
        console.log(`Testing: ${pageInfo.name} (${pageInfo.url})...`);
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        // Track console errors
        const pageErrors = [];
        page.on('pageerror', err => pageErrors.push(err.message));
        page.on('console', msg => {
            if (msg.type() === 'error') pageErrors.push(msg.text());
        });

        try {
            const response = await page.goto(`${BASE_URL}${pageInfo.url}`, { waitUntil: 'networkidle2', timeout: 15000 });

            const status = response.status();
            const title = await page.title();

            // Check for Next.js internal errors (React error overlays)
            const hasNextError = await page.evaluate(() => !!document.querySelector('nextjs-portal'));

            const isSuccess = status >= 200 && status < 400 && !hasNextError && pageErrors.filter(e => e.includes('TypeError') || e.includes('Render')).length === 0;

            if (isSuccess) {
                passed++;
                reportMd += `### ✅ pass: ${pageInfo.name}\n- **URL**: ${pageInfo.url}\n- **Status**: ${status}\n- **Title**: ${title}\n\n`;
            } else {
                failed++;
                reportMd += `### ❌ FAIL: ${pageInfo.name}\n- **URL**: ${pageInfo.url}\n- **Status**: ${status}\n- **Errors**: ${pageErrors.join(', ')}\n- **NextError**: ${hasNextError}\n\n`;
            }

            // Capture screenshot
            await page.screenshot({ path: `qa-reports/${pageInfo.name}.png`, fullPage: false });

        } catch (err) {
            failed++;
            reportMd += `### ❌ TIMEOUT/CRASH: ${pageInfo.name}\n- **URL**: ${pageInfo.url}\n- **Error**: ${err.message}\n\n`;
            console.error(`Error on ${pageInfo.name}:`, err.message);
        } finally {
            await page.close();
        }
    }

    reportMd += `---\n## Summary\n- Total: ${pagesToTest.length}\n- Passed: ${passed}\n- Failed: ${failed}\n`;
    fs.writeFileSync("qa-reports/report.md", reportMd);

    console.log(`\n🎉 Testing Complete! Passed: ${passed}, Failed: ${failed}`);
    console.log(`View report at qa-reports/report.md`);
    await browser.close();
})();
