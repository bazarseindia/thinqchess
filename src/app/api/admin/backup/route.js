import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET — List all backups
export async function GET() {
    try {
        const backups = await prisma.backupLog.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json({ success: true, backups });
    } catch (error) {
        return NextResponse.json({ success: true, backups: [] });
    }
}

// POST — Create a backup
export async function POST() {
    try {
        // Gather all data
        const [registrations, tournamentEntries, tournaments, demoRequests, contactMessages, blogPosts, galleryItems, discountCodes, siteContent] = await Promise.all([
            prisma.registration.findMany().catch(() => []),
            prisma.tournamentEntry.findMany().catch(() => []),
            prisma.tournament.findMany().catch(() => []),
            prisma.demoRequest.findMany().catch(() => []),
            prisma.contactMessage.findMany().catch(() => []),
            prisma.blogPost.findMany().catch(() => []),
            prisma.galleryItem.findMany().catch(() => []),
            prisma.discountCode.findMany().catch(() => []),
            prisma.siteContent.findMany().catch(() => []),
        ]);

        const backupData = {
            timestamp: new Date().toISOString(),
            data: { registrations, tournamentEntries, tournaments, demoRequests, contactMessages, blogPosts, galleryItems, discountCodes, siteContent },
        };

        const filename = `backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        const jsonStr = JSON.stringify(backupData, null, 2);
        const sizeKB = (Buffer.byteLength(jsonStr) / 1024).toFixed(1);

        // Log the backup
        await prisma.backupLog.create({
            data: { filename, size: `${sizeKB} KB`, type: "manual", status: "success" },
        });

        return NextResponse.json({ success: true, filename, size: `${sizeKB} KB`, data: backupData });
    } catch (error) {
        console.error("Backup error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE — Remove a backup log entry
export async function DELETE(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false }, { status: 400 });
        await prisma.backupLog.delete({ where: { id: body.id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
