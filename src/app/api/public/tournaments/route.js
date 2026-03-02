import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Public GET - only return active tournaments with registration counts
export async function GET() {
    try {
        const tournaments = await prisma.tournament.findMany({
            where: { isActive: true },
            orderBy: { startDate: "desc" },
            include: { _count: { select: { registrations: true } } },
        });
        return NextResponse.json({ success: true, tournaments });
    } catch (error) {
        console.error("Public tournaments GET error:", error);
        return NextResponse.json({ success: true, tournaments: [] });
    }
}
