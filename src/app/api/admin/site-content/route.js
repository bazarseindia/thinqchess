export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try { const items = await prisma.siteContent.findMany(); return NextResponse.json({ success: true, items }); }
    catch (e) { return NextResponse.json({ success: true, items: [] }); }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.key) return NextResponse.json({ success: false, error: "Missing key" }, { status: 400 });
        const item = await prisma.siteContent.upsert({
            where: { key: body.key },
            update: { value: body.value || "" },
            create: { key: body.key, value: body.value || "" },
        });
        return NextResponse.json({ success: true, item });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}
