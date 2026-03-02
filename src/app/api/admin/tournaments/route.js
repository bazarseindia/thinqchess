import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET — List all tournaments
export async function GET() {
    try {
        const tournaments = await prisma.tournament.findMany({
            orderBy: { createdAt: "desc" },
            include: { _count: { select: { registrations: true } } },
        });
        return NextResponse.json({ success: true, tournaments });
    } catch (error) {
        console.error("Tournaments GET error:", error);
        return NextResponse.json({ success: false, tournaments: [] });
    }
}

// POST — Create tournament
export async function POST(request) {
    try {
        const body = await request.json();
        const tournament = await prisma.tournament.create({
            data: {
                name: body.name,
                description: body.description || null,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                registrationStartDate: new Date(body.registrationStartDate),
                registrationEndDate: new Date(body.registrationEndDate),
                location: body.location || null,
                flyerImage: body.flyerImage || null,
                isActive: body.isActive ?? true,
                requireKscaId: body.requireKscaId ?? false,
                categories: body.categories || [],
            },
        });
        return NextResponse.json({ success: true, tournament }, { status: 201 });
    } catch (error) {
        console.error("Tournament CREATE error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT — Update tournament
export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

        const tournament = await prisma.tournament.update({
            where: { id: body.id },
            data: {
                name: body.name,
                description: body.description || null,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                registrationStartDate: new Date(body.registrationStartDate),
                registrationEndDate: new Date(body.registrationEndDate),
                location: body.location || null,
                flyerImage: body.flyerImage || null,
                isActive: body.isActive ?? true,
                requireKscaId: body.requireKscaId ?? false,
                categories: body.categories || [],
            },
        });
        return NextResponse.json({ success: true, tournament });
    } catch (error) {
        console.error("Tournament UPDATE error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE — Delete tournament
export async function DELETE(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

        await prisma.tournament.delete({ where: { id: body.id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tournament DELETE error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
