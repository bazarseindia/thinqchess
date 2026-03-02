const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('C:/Users/darpa/OneDrive/Desktop/Thinqchess/v2/src/app/admin');
let changedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Change Primary Color from Yellow to Blue
    content = content.replace(/#FFB31A/g, '#2B3AA0');

    // 2. Remove Popup Modals (Replace fixed overlay with relative block)
    // Find patterns like: <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    // And replace with inline relative containers
    content = content.replace(/className="fixed inset-0 z-\[100\][^"]*"/g, 'className="relative mt-6"');
    content = content.replace(/className="absolute inset-0 bg-black\/60 backdrop-blur-sm"/g, 'className="hidden"');
    // For modals that have max-h-[90vh], change to full height
    content = content.replace(/max-h-\[90vh\]/g, 'h-auto');
    content = content.replace(/shadow-2xl/g, 'shadow-sm');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log(`Updated ${file}`);
    }
});
console.log(`Done. Updated ${changedCount} files.`);
