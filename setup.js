const { initDb } = require('./src/lib/db');

console.log('Starting ThinQ Chess V2 Setup...');
initDb();
console.log('Setup complete. You can now run "npm run dev"');
