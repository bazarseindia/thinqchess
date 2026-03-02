const fs = require('fs');
const path = require('path');

const replacements = {
    // backgrounds
    'bg-[#0F1629]': 'bg-white dark:bg-[#0F1629]',
    'bg-[#0B1120]': 'bg-gray-50 dark:bg-[#0B1120]',
    'bg-white/5': 'bg-gray-100 dark:bg-white/5',
    'bg-white/10': 'bg-gray-200 dark:bg-white/10',
    'hover:bg-white/5': 'hover:bg-gray-100 dark:hover:bg-white/5',
    'hover:bg-white/10': 'hover:bg-gray-200 dark:hover:bg-white/10',
    // text colors
    'text-white': 'text-gray-900 dark:text-white',
    'text-white/20': 'text-gray-400 dark:text-white/20',
    'text-white/25': 'text-gray-400 dark:text-white/25',
    'text-white/30': 'text-gray-500 dark:text-white/30',
    'text-white/40': 'text-gray-600 dark:text-white/40',
    'text-white/50': 'text-gray-700 dark:text-white/50',
    'text-white/60': 'text-gray-700 dark:text-white/60',
    'text-white/70': 'text-gray-800 dark:text-white/70',
    // border colors
    'border-white/5': 'border-gray-200 dark:border-white/5',
    'border-white/10': 'border-gray-300 dark:border-white/10',
};

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
    if (file.endsWith('layout.jsx') || file.endsWith('page.js')) return;

    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    for (const [oldClass, newClasses] of Object.entries(replacements)) {
        // Regex ensures we only match the oldClass if it is bounded by spaces, quotes, or backticks 
        // AND not preceded by 'dark:' to avoid double-replacing.
        const escapedClass = oldClass.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(?<!dark:)(?<=[\\s\`"'])(${escapedClass})(?=[\\s\`"'])`, 'g');
        content = content.replace(regex, newClasses);
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedCount++;
        console.log(`Updated ${file}`);
    }
});
console.log(`Done. Updated ${changedCount} files.`);
