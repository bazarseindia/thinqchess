const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const host = '93.127.199.194';
const user = 'root';
const pass = 'Thinqre@1234';

// Use a simple SSH command with a heredoc for multiple commands
// Since we don't have sshpass, we will guide the user on how to run this if needed, 
// but I will try to use a powershell trick or a local node script with SSH2 if I can.

// Let's try to use the 'ssh2' library if I can install it.
// Actually, I'll try to use a simple approach: 
// 1. Create a setup.sh script
// 2. Transfer it to the server (tricky without sshpass)
// 3. Execute it.

// Given the environment constraints, I will try to use 'run_command' with 'ssh' 
// and handle the password input carefully.

const commands = [
    'apt-get update',
    'apt-get install -y curl git nginx python3-certbot-nginx',
    'curl -fsSL https://deb.nodesource.com/setup_20.x | bash -',
    'apt-get install -y nodejs',
    'npm install -g pm2',
    'mkdir -p /var/www/thinqchess',
    'echo "Setup Basic Dependencies Done"'
];

console.log("Preparing deployment command...");
const combinedCommands = commands.join(' && ');
const sshCommand = `ssh -o StrictHostKeyChecking=no ${user}@${host} "${combinedCommands}"`;

console.log("Command to run:", sshCommand);
// The agent will call this script and then send the password.
