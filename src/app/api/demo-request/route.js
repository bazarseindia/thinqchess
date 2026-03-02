import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        const demo = await prisma.demoRequest.create({
            data: {
                name: body.name || "",
                email: body.email || "",
                phone: body.phone || null,
                message: body.message || null,
            },
        });

        return NextResponse.json({ success: true, id: demo.id }, { status: 201 });
    } catch (error) {
        console.error("Demo Request Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const demos = await prisma.demoRequest.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(demos);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        await prisma.demoRequest.delete({ where: { id: id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Demo Request Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
