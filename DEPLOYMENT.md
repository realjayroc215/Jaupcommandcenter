# J-A-U-P Command Center — Deployment Guide

## Pre-Requisites

### Frontend (GitHub Pages)
- GitHub account with repository access
- Git CLI installed

### Backend (Linux Server)
- Linux box (Ubuntu 20.04+, Debian, etc.)
- Node.js 18+
- npm 9+
- FFmpeg
- RTSP camera URLs

---

## Frontend Deployment (5 minutes)

### 1. Clone and Setup

```bash
git clone https://github.com/realjayroc215/Jaupcommandcenter.git
cd Jaupcommandcenter
git checkout frontend-github-pages
npm install
```

### 2. Build Static Export

```bash
npm run build
```

Next.js generates static files in `/out`.

### 3. Move to GitHub Pages Directory

```bash
rm -rf docs
mv out docs
```

GitHub Pages serves from `/docs` by default.

### 4. Commit and Push

```bash
git add .
git commit -m "Deploy Command Center v1"
git push origin frontend-github-pages
```

### 5. Enable GitHub Pages

**Via GitHub UI:**
1. Go to repo **Settings**
2. Click **Pages** (left sidebar)
3. Under "Source", select:
   - Deploy from a branch
   - Branch: `frontend-github-pages`
   - Folder: `/docs`
4. Click **Save**

GitHub will build and deploy automatically.

**Via GitHub CLI:**

```bash
gh repo edit --enable-pages --pages-source frontend-github-pages /docs
```

### 6. Verify

Your site is live at:
```
https://realjayroc215.github.io/Jaupcommandcenter
```

Check build status in repo **Actions** tab.

---

## Backend Deployment (5 minutes)

### 1. SSH into Linux Box

```bash
ssh user@your-linux-ip
```

### 2. Install System Dependencies

```bash
sudo apt update
sudo apt install -y curl git nodejs npm ffmpeg
```

**Verify installations:**

```bash
node --version   # Should be 18+
npm --version    # Should be 9+
ffmpeg -version  # Should show FFmpeg version
```

### 3. Clone Backend Code

```bash
git clone https://github.com/realjayroc215/Jaupcommandcenter.git
cd Jaupcommandcenter
git checkout backend-setup
```

### 4. Install Node Dependencies

```bash
npm install
```

### 5. Configure Environment

```bash
cp .env.example .env
nano .env
```

**Edit .env:**

```bash
PORT=4000
FELT_RTSP=rtsp://user:password@192.168.1.10:554/stream
RING_RTSP=rtsp://user:password@192.168.1.11:554/stream
```

**Save (Ctrl+O, Enter, Ctrl+X).**

### 6. Test Backend

```bash
npm start
```

You should see:
```
J-A-U-P backend running on port 4000
Health check: http://localhost:4000/api/health
```

**Test endpoints:**

```bash
# In another terminal
curl http://localhost:4000/api/health
curl -X POST http://localhost:4000/api/brain -H "Content-Type: application/json" -d '{"input": "test"}'
```

### 7. Keep Backend Running (Two Options)

#### Option A: Screen / tmux (Simple)

```bash
screen -S jaup-backend
npm start
# Detach: Ctrl+A, then D
# Reattach: screen -r jaup-backend
```

#### Option B: systemd Service (Recommended)

```bash
sudo cp systemd-service.ini /etc/systemd/system/jaup-backend.service
sudo nano /etc/systemd/system/jaup-backend.service
```

**Edit paths:**
- `WorkingDirectory=/path/to/Jaupcommandcenter`
- `ExecStart=/usr/bin/node /path/to/server.js`
- Set `Environment=` variables for RTSP URLs

**Enable and start:**

```bash
sudo systemctl daemon-reload
sudo systemctl enable jaup-backend
sudo systemctl start jaup-backend
sudo systemctl status jaup-backend
```

**View logs:**

```bash
sudo journalctl -u jaup-backend -f
```

---

## Firewall Configuration

If your Linux box has a firewall, allow port 4000:

```bash
# UFW
sudo ufw allow 4000/tcp

# firewalld
sudo firewall-cmd --permanent --add-port=4000/tcp
sudo firewall-cmd --reload

# iptables
sudo iptables -A INPUT -p tcp --dport 4000 -j ACCEPT
```

---

## Connect Frontend to Backend

Edit `components/BrainConsole.tsx` in frontend-github-pages branch:

```tsx
const sendToBrain = async () => {
  if (!input.trim()) return;
  setLog((prev) => [`> ${input}`, ...prev]);
  setInput('');

  try {
    const res = await fetch("https://YOUR-LINUX-IP:4000/api/brain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input })
    });
    const data = await res.json();
    setLog((prev) => [`< ${JSON.stringify(data)}`, ...prev]);
  } catch (err) {
    setLog((prev) => [`❌ ERROR: ${err.message}`, ...prev]);
  }
};
```

**Redeploy:**

```bash
git add components/BrainConsole.tsx
git commit -m "Add backend API connection"
git push
```

---

## SSL / HTTPS (For Production)

If accessing backend from frontend over HTTPS, backend must also be HTTPS.

### With Let's Encrypt (Free)

```bash
sudo apt install -y certbot
sudo certbot certonly --standalone -d your-domain.com
```

### With nginx Reverse Proxy

```bash
sudo apt install -y nginx
```

**Create nginx config** (`/etc/nginx/sites-available/jaup`):

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Enable:**

```bash
sudo ln -s /etc/nginx/sites-available/jaup /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## Monitoring

### Check Backend Status

```bash
curl http://localhost:4000/api/status
```

### View systemd Logs

```bash
sudo journalctl -u jaup-backend --since "1 hour ago"
```

### Monitor Resource Usage

```bash
top
ps aux | grep node
```

---

## Rollback

### Frontend

```bash
git revert HEAD
git push
```

### Backend

```bash
git checkout HEAD~1
npm install
sudo systemctl restart jaup-backend
```

---

## Troubleshooting

### Frontend: Site not loading
- Check GitHub Pages settings
- Verify `/docs` folder exists and contains `index.html`
- Check build logs in repo **Actions** tab

### Backend: Port already in use

```bash
lsof -i :4000
kill -9 PID
```

### Backend: RTSP connection fails

```bash
# Test RTSP URL directly
ffmpeg -i rtsp://user:pass@192.168.1.10:554/stream -f null -
```

### Backend: Logs show no errors but API unresponsive

```bash
# Restart systemd service
sudo systemctl restart jaup-backend

# Check if service is running
sudo systemctl status jaup-backend
```

---

## Production Checklist

- [ ] Frontend deployed to GitHub Pages
- [ ] Backend running on Linux server
- [ ] systemd service auto-starts on reboot
- [ ] Firewall allows port 4000
- [ ] SSL/TLS enabled (if over internet)
- [ ] Environment variables configured
- [ ] RTSP URLs tested
- [ ] Camera feeds working
- [ ] Brain API responding
- [ ] Monitoring/logging set up
- [ ] Backup strategy in place

---

**Deployment Time:** ~10 minutes  
**Maintenance:** Minimal (logs, monitoring, occasional updates)
