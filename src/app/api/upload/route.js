import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') || formData.get('image');
        const type = formData.get('type') || 'tournament';
        const tournamentId = formData.get('tournament_id');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
            return NextResponse.json({ error: 'File must be an image or video' }, { status: 400 });
        }

        if (file.size > 20 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 20MB' }, { status: 400 });
        }

        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}_${originalName}`;

        const folderMap = {
            'tournament': 'tournament-flyers',
            'gallery': 'gallery',
            'blog': 'blogs',
            'site-image': 'site-images'
        };

        const folder = folderMap[type] || 'tournament-flyers';
        let uploadDir;
        let fileUrl;

        if (type === 'tournament' && tournamentId) {
            uploadDir = path.join(process.cwd(), 'public', 'upload', folder, `tournament-${tournamentId}`);
            fileUrl = `/upload/${folder}/tournament-${tournamentId}/${filename}`;
        } else {
            uploadDir = path.join(process.cwd(), 'public', 'upload', folder);
            fileUrl = `/upload/${folder}/${filename}`;
        }

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({
            success: true,
            url: fileUrl,
            filename: filename,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            message: 'Image uploaded successfully!'
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
