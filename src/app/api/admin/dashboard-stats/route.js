import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Parallel fetch all counts
        const [
            totalRegistrations,
            registrationsThisMonth,
            totalTournaments,
            tournamentEntries,
            totalDemoRequests,
            demoRequestsThisMonth,
            totalContactMessages,
            contactMessagesThisMonth,
            totalBlogPosts,
            publishedBlogs,
            totalGalleryItems,
            recentRegistrations,
            recentTournamentEntries,
            recentDemoRequests,
            recentContactMessages,
        ] = await Promise.all([
            prisma.registration.count(),
            prisma.registration.count({ where: { createdAt: { gte: startOfMonth } } }),
            prisma.tournament.count().catch(() => 0),
            prisma.tournamentEntry.count(),
            prisma.demoRequest.count(),
            prisma.demoRequest.count({ where: { createdAt: { gte: startOfMonth } } }),
            prisma.contactMessage.count(),
            prisma.contactMessage.count({ where: { createdAt: { gte: startOfMonth } } }),
            prisma.blogPost.count().catch(() => 0),
            prisma.blogPost.count({ where: { isPublished: true } }).catch(() => 0),
            prisma.galleryItem.count().catch(() => 0),
            // Recent items for activity feed
            prisma.registration.findMany({ orderBy: { createdAt: "desc" }, take: 3, select: { id: true, studentFirstName: true, studentLastName: true, createdAt: true } }),
            prisma.tournamentEntry.findMany({ orderBy: { createdAt: "desc" }, take: 3, select: { id: true, playerFirstName: true, playerLastName: true, categoryName: true, createdAt: true } }),
            prisma.demoRequest.findMany({ orderBy: { createdAt: "desc" }, take: 2, select: { id: true, name: true, createdAt: true } }),
            prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 2, select: { id: true, name: true, subject: true, createdAt: true } }),
        ]);

        // Build recent activity feed
        const timeAgo = (date) => {
            const seconds = Math.floor((now - new Date(date)) / 1000);
            if (seconds < 60) return "Just now";
            if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
            if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
            return `${Math.floor(seconds / 86400)}d ago`;
        };

        const recentActivity = [
            ...recentRegistrations.map(r => ({
                type: "registration",
                title: `New Registration: ${r.studentFirstName} ${r.studentLastName}`,
                subtitle: "Course Registration",
                time: timeAgo(r.createdAt),
                date: r.createdAt,
            })),
            ...recentTournamentEntries.map(r => ({
                type: "tournament",
                title: `Tournament Entry: ${r.playerFirstName} ${r.playerLastName}`,
                subtitle: r.categoryName || "Tournament Registration",
                time: timeAgo(r.createdAt),
                date: r.createdAt,
            })),
            ...recentDemoRequests.map(r => ({
                type: "demo",
                title: `Demo Request: ${r.name}`,
                subtitle: "Free Trial Request",
                time: timeAgo(r.createdAt),
                date: r.createdAt,
            })),
            ...recentContactMessages.map(r => ({
                type: "contact",
                title: `Contact: ${r.name}`,
                subtitle: r.subject || "Contact Message",
                time: timeAgo(r.createdAt),
                date: r.createdAt,
            })),
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);

        return NextResponse.json({
            success: true,
            stats: {
                totalRegistrations,
                registrationsThisMonth,
                totalTournaments,
                tournamentEntries,
                totalDemoRequests,
                demoRequestsThisMonth,
                totalContactMessages,
                contactMessagesThisMonth,
                totalBlogPosts,
                publishedBlogs,
                totalGalleryItems,
            },
            recentActivity,
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({
            success: true,
            stats: {
                totalRegistrations: 0, registrationsThisMonth: 0,
                totalTournaments: 0, tournamentEntries: 0,
                totalDemoRequests: 0, demoRequestsThisMonth: 0,
                totalContactMessages: 0, contactMessagesThisMonth: 0,
                totalBlogPosts: 0, publishedBlogs: 0, totalGalleryItems: 0,
            },
            recentActivity: [],
        });
    }
}
