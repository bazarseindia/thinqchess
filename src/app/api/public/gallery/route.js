import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
        return NextResponse.json({ success: true, items });
    } catch (e) { return NextResponse.json({ success: true, items: [] }); }
}
