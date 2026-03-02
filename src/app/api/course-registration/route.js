import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        const registration = await prisma.registration.create({
            data: {
                classesFor: body.classesFor || "Child",
                studentFirstName: body.participant_first_name || body.studentFirstName || "",
                studentMiddleName: body.studentMiddleName || null,
                studentLastName: body.participant_last_name || body.studentLastName || "",
                dob: body.dob || "",
                gender: body.gender || "",
                studentEmail: body.studentEmail || body.email || null,
                studentPhone: body.studentPhone || body.phone || null,
                fatherFirstName: body.fatherFirstName || null,
                fatherMiddleName: body.fatherMiddleName || null,
                fatherLastName: body.fatherLastName || null,
                fatherEmail: body.fatherEmail || null,
                fatherPhone: body.fatherPhone || null,
                motherFirstName: body.motherFirstName || null,
                motherMiddleName: body.motherMiddleName || null,
                motherLastName: body.motherLastName || null,
                motherEmail: body.motherEmail || null,
                motherPhone: body.motherPhone || null,
                country: body.country || null,
                state: body.state || null,
                city: body.city || null,
                addressLine1: body.address_line1 || body.address || null,
                addressLine2: body.address_line2 || null,
                pincode: body.pincode || null,
                mode: body.mode || body.course_type || null,
                coachingCity: body.coaching_city || null,
                preferredCentre: body.preferredCentre || null,
                heardFrom: body.heard_from || body.heardFrom || null,
                refFirstName: body.refFirstName || null,
                refLastName: body.refLastName || null,
            },
        });

        return NextResponse.json({ success: true, id: registration.id }, { status: 201 });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const registrations = await prisma.registration.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(registrations);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        await prisma.registration.delete({ where: { id: id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Registration Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
