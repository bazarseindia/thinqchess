import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const codes = await prisma.discountCode.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json({ success: true, codes });
    } catch (error) {
        return NextResponse.json({ success: true, codes: [] });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const code = await prisma.discountCode.create({
            data: {
                code: body.code,
                codeType: body.codeType || "percentage",
                discountPercentage: body.discountPercentage ? parseFloat(body.discountPercentage) : null,
                discountAmount: body.discountAmount ? parseFloat(body.discountAmount) : null,
                usageLimit: body.usageLimit ? parseInt(body.usageLimit) : 100,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
                isActive: body.isActive ?? true,
            },
        });
        return NextResponse.json({ success: true, code }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
        const code = await prisma.discountCode.update({
            where: { id: body.id },
            data: {
                code: body.code,
                codeType: body.codeType || "percentage",
                discountPercentage: body.discountPercentage ? parseFloat(body.discountPercentage) : null,
                discountAmount: body.discountAmount ? parseFloat(body.discountAmount) : null,
                usageLimit: body.usageLimit ? parseInt(body.usageLimit) : 100,
                expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
                isActive: body.isActive ?? true,
            },
        });
        return NextResponse.json({ success: true, code });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
        await prisma.discountCode.delete({ where: { id: body.id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
