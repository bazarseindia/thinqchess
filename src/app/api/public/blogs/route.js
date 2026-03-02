import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json({ success: true, posts });
    } catch (e) { return NextResponse.json({ success: true, posts: [] }); }
}
