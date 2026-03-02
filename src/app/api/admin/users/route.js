import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const users = await prisma.adminUser.findMany({
            orderBy: { createdAt: "desc" },
            select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true }
        });
        return NextResponse.json({ success: true, users });
    } catch (e) { return NextResponse.json({ success: true, users: [] }); }
}

export async function POST(request) {
    try {
        const body = await request.json();
        if (!body.name || !body.email || !body.password) {
            return NextResponse.json({ success: false, error: "Name, email, and password are required" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const user = await prisma.adminUser.create({
            data: { name: body.name, email: body.email, password: hashedPassword, role: body.role || "admin", isActive: body.isActive ?? true }
        });
        return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
    } catch (e) {
        if (e.code === 'P2002') return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 });
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false }, { status: 400 });
        const data = { name: body.name, email: body.email, role: body.role, isActive: body.isActive ?? true };
        if (body.password) data.password = await bcrypt.hash(body.password, 12);
        const user = await prisma.adminUser.update({ where: { id: body.id }, data });
        return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false }, { status: 400 });
        await prisma.adminUser.delete({ where: { id: body.id } });
        return NextResponse.json({ success: true });
    } catch (e) { return NextResponse.json({ success: false, error: e.message }, { status: 500 }); }
}
