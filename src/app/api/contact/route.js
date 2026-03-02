import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();

        const contact = await prisma.contactMessage.create({
            data: {
                name: body.name || "",
                email: body.email || "",
                phone: body.phone || null,
                subject: body.subject || null,
                message: body.message || "",
            },
        });

        return NextResponse.json({ success: true, id: contact.id }, { status: 201 });
    } catch (error) {
        console.error("Contact Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const contacts = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        await prisma.contactMessage.delete({ where: { id: id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact Message Delete Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
