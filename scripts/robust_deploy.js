const { spawn } = require('child_process');

function runSshCommand(command) {
    return new Promise((resolve, reject) => {
        const ssh = spawn('ssh', [
            '-tt',
            '-o', 'StrictHostKeyChecking=no',
            'root@93.127.199.194',
            command
        ], { shell: true });

        let output = '';
        let error = '';

        ssh.stdout.on('data', (data) => {
            console.log(`STDOUT: ${data}`);
            output += data;
        });

        ssh.stderr.on('data', (data) => {
            const str = data.toString();
            console.log(`STDERR: ${str}`);
            if (str.toLowerCase().includes('password:')) {
                ssh.stdin.write('Thinqre@1234\n');
            }
            error += str;
        });

        ssh.on('close', (code) => {
            if (code === 0) resolve(output);
            else reject(new Error(`Exit code ${code}. Error: ${error}`));
        });
    });
}

// Full deployment sequence
async function deploy() {
    try {
        console.log("--- 1. Installing Essentials ---");
        await runSshCommand("apt-get update && apt-get install -y curl git nginx nodejs npm && npm install -g pm2");

        console.log("--- 2. Setting Up App Folder ---");
        await runSshCommand("mkdir -p /var/www/thinqchess-v2");

        console.log("--- 3. Clearing Old Files (if any) ---");
        await runSshCommand("rm -rf /var/www/thinqchess-v2/*");

        console.log("--- Setup Done ---");
    } catch (err) {
        console.error("Deploy failed:", err);
    }
}

deploy();
