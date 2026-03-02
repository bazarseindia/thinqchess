import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        const entry = await prisma.tournamentEntry.create({
            data: {
                tournamentId: body.tournament_id || body.tournamentId || "",
                categoryId: body.tournament_type || body.categoryId || "",
                categoryName: body.categoryName || body.tournament_type || "",
                playerFirstName: body.participantFirstName || body.playerFirstName || "",
                playerMiddleName: body.playerMiddleName || null,
                playerLastName: body.participantLastName || body.playerLastName || "",
                email: body.email || "",
                phone: body.phone || null,
                dob: body.dob || null,
                gender: body.gender || null,
                fideId: body.fide_id || body.fideId || null,
                kscaId: body.ksca_id || body.kscaId || null,
                country: body.country || null,
                countryCode: body.countryCode || null,
                state: body.state || null,
                city: body.city || null,
                address: body.address || null,
                amountPaid: body.amount_paid != null ? parseFloat(body.amount_paid) : 0,
                discountCode: body.discountCode || body.discount_code || null,
                discountAmount: body.discount_amount != null ? parseFloat(body.discount_amount) : 0,
                paymentId: body.payment_id || body.paymentId || null,
                razorpayOrderId: body.razorpay_order_id || body.razorpayOrderId || null,
                paymentStatus: body.payment_status || body.paymentStatus || "pending",
            },
        });

        return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
    } catch (error) {
        console.error("Tournament Register Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
