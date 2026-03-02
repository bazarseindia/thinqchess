#!/bin/bash

# ==========================================================================
# THINQCHESS V2 — MASTER DEPLOYMENT SCRIPT (Ubuntu 22.04)
# ==========================================================================

# 1. Configuration (EDIT THESE)
DOMAIN="yourdomain.com"
GITHUB_REPO="https://github.com/your-username/thinqchess-v2.git"

echo "🚀 Starting Thinqchess V2 Deployment..."

# 2. System Update & Dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx python3-certbot-nginx

# 3. Install Node.js 20
if ! command -v node &> /dev/null
then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 4. Install PM2
sudo npm install -g pm2

# 5. Application Setup
if [ ! -d "thinqchess-v2" ]; then
    echo "📂 Cloning repository..."
    git clone $GITHUB_REPO thinqchess-v2
fi

cd thinqchess-v2
echo "📦 Installing npm packages..."
npm install

# 6. Create production .env if not exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat <<EOT >> .env
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://$DOMAIN"
DATABASE_URL="file:./dev.db"
EOT
fi

# 7. Build Project
echo "🏗️ Building Next.js application..."
npm run build

# 8. Start with PM2
echo "🏃 Starting application with PM2..."
pm2 delete thinqchess 2>/dev/null || true
pm2 start npm --name "thinqchess" -- start
pm2 save
pm2 startup

# 9. Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/thinqchess > /dev/null <<EOT
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOT

sudo ln -s /etc/nginx/sites-available/thinqchess /etc/nginx/sites-enabled/ 2>/dev/null
sudo rm /etc/nginx/sites-enabled/default 2>/dev/null
sudo nginx -t && sudo systemctl restart nginx

echo "✅ DEPLOYMENT COMPLETE!"
