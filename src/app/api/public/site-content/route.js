export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');

        if (key) {
            const item = await prisma.siteContent.findUnique({ where: { key } });
            return NextResponse.json({ success: true, item });
        }

        const items = await prisma.siteContent.findMany();
        return NextResponse.json({ success: true, items });
    } catch (e) { return NextResponse.json({ success: true, items: [] }); }
}
