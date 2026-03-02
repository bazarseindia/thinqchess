import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try { const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }); return NextResponse.json({ success: true, blogs }); }
    catch (e) { return NextResponse.json({ success: true, blogs: [] }); }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const blog = await prisma.blogPost.create({ data: { title: body.title, slug: body.slug, content: body.content || "", excerpt: body.excerpt || null, featuredImage: body.featuredImage || null, category: body.category || null, tags: body.tags || null, isPublished: body.isPublished ?? false, author: body.author || "ThinQ Chess" } });
        return NextResponse.json({ success: true, blog }, { status: 201 });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
        const blog = await prisma.blogPost.update({ where: { id: body.id }, data: { title: body.title, slug: body.slug, content: body.content || "", excerpt: body.excerpt || null, featuredImage: body.featuredImage || null, category: body.category || null, tags: body.tags || null, isPublished: body.isPublished ?? false } });
        return NextResponse.json({ success: true, blog });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
        await prisma.blogPost.delete({ where: { id: body.id } });
        return NextResponse.json({ success: true });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}
