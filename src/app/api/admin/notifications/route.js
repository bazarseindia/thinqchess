import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: "desc" },
            take: 50
        });
        const unreadCount = await prisma.notification.count({ where: { isRead: false } });
        return NextResponse.json({ success: true, notifications, unreadCount });
    } catch (e) { return NextResponse.json({ success: true, notifications: [], unreadCount: 0 }); }
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        if (body.markAllRead) {
            await prisma.notification.updateMany({ where: { isRead: false }, data: { isRead: true } });
        } else if (body.id) {
            await prisma.notification.update({ where: { id: body.id }, data: { isRead: true } });
        }
        return NextResponse.json({ success: true });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}
