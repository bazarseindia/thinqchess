import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runGit(cmd) {
    try {
        const { stdout } = await execAsync(`git ${cmd}`, { cwd: process.cwd(), timeout: 5000 });
        return stdout.trim();
    } catch (e) { return null; }
}

export async function GET() {
    try {
        const [branch, lastCommit, commitDate, status, remoteStatus] = await Promise.all([
            runGit('branch --show-current'),
            runGit('log -1 --pretty=format:"%s"'),
            runGit('log -1 --pretty=format:"%ci"'),
            runGit('status --porcelain'),
            runGit('status -sb'),
        ]);

        const uncommittedChanges = status ? status.split('\n').filter(Boolean).length : 0;
        const aheadBehind = remoteStatus?.match(/\[(.+)\]/)?.[1] || 'up to date';

        return NextResponse.json({
            success: true,
            git: {
                branch: branch || 'unknown',
                lastCommitMessage: lastCommit?.replace(/"/g, '') || 'No commits',
                lastCommitDate: commitDate?.replace(/"/g, '') || '',
                uncommittedChanges,
                syncStatus: aheadBehind,
                hasChanges: uncommittedChanges > 0
            }
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Git not available' }, { status: 500 });
    }
}
