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

    // Fix button text color: bg-[#2B3AA0] text-[#0B1120] -> bg-[#2B3AA0] text-white
    content = content.replace(/bg-\[#2B3AA0\] text-\[#0B1120\]/g, 'bg-[#2B3AA0] text-white');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log(`Fixed button colors: ${file}`);
    }
});
console.log(`Done. Updated ${changedCount} files.`);
