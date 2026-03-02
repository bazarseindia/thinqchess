import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        const entry = await prisma.tournamentEntry.create({
            data: {
                tournamentId: body.tournamentId || "",
                categoryId: body.categoryId || "",
                categoryName: body.categoryName || "",
                playerFirstName: body.playerFirstName || "",
                playerMiddleName: body.playerMiddleName || null,
                playerLastName: body.playerLastName || "",
                email: body.email || "",
                phone: body.phone || null,
                dob: body.dob || null,
                gender: body.gender || null,
                fideId: body.fideId || null,
                kscaId: body.kscaId || null,
                country: body.country || null,
                countryCode: body.countryCode || null,
                state: body.state || null,
                city: body.city || null,
                address: body.address || null,
                amountPaid: body.amountPaid ?? (body.amount ? parseFloat(body.amount) : 0),
                discountCode: body.discountCode || null,
                discountAmount: body.discountAmount ? parseFloat(body.discountAmount) : 0,
                paymentId: body.paymentId || null,
                razorpayOrderId: body.razorpayOrderId || null,
                paymentStatus: body.paymentStatus || "pending",
            },
        });

        return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
    } catch (error) {
        console.error("Tournament Entry Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const entries = await prisma.tournamentEntry.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
