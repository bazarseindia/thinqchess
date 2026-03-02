import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        const entry = await prisma.trainYourTrainer.create({
            data: {
                name: body.name || "",
                email: body.email || "",
                phone: body.phone || null,
                experience: body.experience || null,
                message: body.message || null,
                resume: body.resume || null,
            },
        });

        return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
    } catch (error) {
        console.error("Train-the-Trainer Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
