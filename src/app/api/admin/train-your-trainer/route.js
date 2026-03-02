import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const entries = await prisma.trainYourTrainer.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json({ success: true, entries });
    } catch (error) {
        return NextResponse.json({ success: true, entries: [] });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        await prisma.trainYourTrainer.delete({ where: { id: id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Train Your Trainer Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
