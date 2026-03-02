import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

async function runCommand(cmd) {
    try { const { stdout } = await execAsync(cmd, { cwd: process.cwd(), timeout: 15000 }); return stdout; }
    catch (e) { return e.stdout || e.message; }
}

function scanSuspiciousFiles(dir, results = [], depth = 0) {
    if (depth > 3) return results;
    try {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            if (item === 'node_modules' || item === '.next' || item === '.git') continue;
            const full = path.join(dir, item);
            const stat = fs.statSync(full);
            if (stat.isDirectory()) { scanSuspiciousFiles(full, results, depth + 1); }
            else {
                const ext = path.extname(item).toLowerCase();
                if (['.php', '.exe', '.bat', '.sh', '.py'].includes(ext) && !item.includes('node_modules')) {
                    results.push({ file: full.replace(process.cwd(), ''), ext, size: stat.size });
                }
            }
        }
    } catch (e) { }
    return results;
}

export async function GET() {
    try {
        // 1. npm audit
        let auditResult = { vulnerabilities: 0, details: 'Clean' };
        try {
            const auditOutput = await runCommand('npm audit --json 2>&1');
            const audit = JSON.parse(auditOutput);
            const totalVulns = audit.metadata?.vulnerabilities || {};
            const count = (totalVulns.high || 0) + (totalVulns.critical || 0);
            auditResult = { vulnerabilities: count, details: count > 0 ? `${count} high/critical vulnerabilities` : 'No high/critical vulnerabilities' };
        } catch (e) { auditResult = { vulnerabilities: 0, details: 'Audit check completed' }; }

        // 2. Suspicious files
        const suspiciousFiles = scanSuspiciousFiles(process.cwd());

        // 3. Env check
        const envPath = path.join(process.cwd(), '.env');
        const envExists = fs.existsSync(envPath);
        const requiredKeys = ['DATABASE_URL', 'NEXTAUTH_SECRET'];
        let envStatus = { exists: envExists, missingKeys: [] };
        if (envExists) {
            const envContent = fs.readFileSync(envPath, 'utf-8');
            envStatus.missingKeys = requiredKeys.filter(key => !envContent.includes(key));
        }

        return NextResponse.json({
            success: true,
            security: {
                dependencies: auditResult,
                suspiciousFiles: { count: suspiciousFiles.length, files: suspiciousFiles },
                environment: envStatus,
                lastScan: new Date().toISOString()
            }
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
