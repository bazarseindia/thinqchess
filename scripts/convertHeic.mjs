import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import heicConvert from 'heic-convert';

const dir = 'public/assets/home';

async function run() {
    const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.heic'));
    for (const file of files) {
        console.log(`Converting ${file}...`);
        const inputBuffer = await promisify(fs.readFile)(path.join(dir, file));
        try {
            const outputBuffer = await heicConvert({
                buffer: inputBuffer,
                format: 'JPEG',
                quality: 0.8
            });
            const newFileName = file.replace(/\.heic$/i, '.jpeg');
            await promisify(fs.writeFile)(path.join(dir, newFileName), outputBuffer);
            fs.unlinkSync(path.join(dir, file));
            console.log(`Successfully converted ${file} to ${newFileName}`);
        } catch (e) {
            console.error(`Failed to convert ${file}:`, e.message);
        }
    }
}

run();
