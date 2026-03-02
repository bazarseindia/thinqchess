import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try { const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } }); return NextResponse.json({ success: true, items }); }
    catch (e) { return NextResponse.json({ success: true, items: [] }); }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const item = await prisma.galleryItem.create({ data: { type: body.type || "image", url: body.url, caption: body.caption || null, category: body.category || null } });
        return NextResponse.json({ success: true, item }, { status: 201 });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false }, { status: 400 });
        const item = await prisma.galleryItem.update({ where: { id: body.id }, data: { caption: body.caption } });
        return NextResponse.json({ success: true, item });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false }, { status: 400 });
        await prisma.galleryItem.delete({ where: { id: body.id } });
        return NextResponse.json({ success: true });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}
