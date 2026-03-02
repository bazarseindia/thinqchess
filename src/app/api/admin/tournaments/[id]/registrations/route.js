import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const entries = await prisma.tournamentEntry.findMany({
            where: { tournamentId: id },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ success: true, entries });
    } catch (error) {
        console.error("Tournament entries error:", error);
        return NextResponse.json({ success: false, entries: [] });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const entryId = searchParams.get('entry_id');

        if (!entryId) return NextResponse.json({ success: false, error: 'Registration ID is required' }, { status: 400 });

        await prisma.tournamentEntry.delete({
            where: { id: entryId, tournamentId: id } // Ensure it belongs to the correct tournament
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tournament Registration Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
