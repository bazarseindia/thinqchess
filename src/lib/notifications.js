import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Utility to create a notification when form is submitted
export async function createNotification(type, title, message) {
    try {
        await prisma.notification.create({
            data: { type, title, message, isRead: false }
        });
    } catch (e) { console.error("Failed to create notification:", e); }
}

// Reusable mailer (sends email if SMTP configured)
export async function sendAdminEmail(subject, htmlBody) {
    try {
        const nodemailer = await import('nodemailer');
        const email = process.env.SMTP_EMAIL;
        const password = process.env.SMTP_PASSWORD;
        if (!email || !password) return;

        const transporter = nodemailer.default.createTransport({
            service: 'gmail',
            auth: { user: email, pass: password }
        });

        await transporter.sendMail({
            from: `"ThinQ Chess Admin" <${email}>`,
            to: email,
            subject: `[ThinQ Chess] ${subject}`,
            html: htmlBody
        });
    } catch (e) { console.error("Email send failed:", e); }
}
