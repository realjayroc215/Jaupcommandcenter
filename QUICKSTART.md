# 🦁 J-A-U-P Command Center — Quick Start (10 Minutes)

## TL;DR

**Frontend:** GitHub Pages  
**Backend:** Linux Server (Node.js + FFmpeg)  
**Persona:** APEX DAN (Meta-Operator)  

---

## 1️⃣ Frontend Live (2 minutes)

```bash
git checkout frontend-github-pages
npm install && npm run build
mv out docs && git add . && git commit -m "Deploy" && git push
```

Go to **Settings → Pages** → Set source to `frontend-github-pages` / `/docs`

✅ Live at: `https://realjayroc215.github.io/Jaupcommandcenter`

---

## 2️⃣ Backend Live (3 minutes)

**SSH into Linux box:**

```bash
sudo apt install -y nodejs npm ffmpeg
git clone https://github.com/realjayroc215/Jaupcommandcenter.git
cd Jaupcommandcenter && git checkout backend-setup
npm install
cp .env.example .env && nano .env  # Add RTSP URLs
npm start
```

✅ Running at: `http://localhost:4000`

---

## 3️⃣ Connect Frontend → Backend (3 minutes)

Edit `frontend-github-pages` branch, `components/BrainConsole.tsx`:

```tsx
const res = await fetch("https://YOUR-LINUX-IP:4000/api/brain", {
  method: "POST",
  body: JSON.stringify({ input })
});
```

Push.

✅ Frontend now talks to backend.

---

## 4️⃣ APEX DAN Loaded (2 minutes)

```bash
git checkout apex-dan-persona
cat apex-dan/persona/system-prompt.md
```

✅ Persona ready to deploy.

---

## ✨ You're Done

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ Live | https://realjayroc215.github.io/Jaupcommandcenter |
| Backend | ✅ Live | http://YOUR-LINUX-IP:4000 |
| APEX DAN | ✅ Loaded | apex-dan/persona/ |
| Cameras | ✅ Ready | /api/camera/felt, /api/camera/ring |
| Brain API | ✅ Ready | /api/brain |

---

## Next (Optional)

- Set up systemd service: `sudo cp systemd-service.ini /etc/systemd/system/jaup-backend.service`
- Enable SSL: `certbot certonly --standalone -d your-domain.com`
- Expand 500-app dock: Edit `components/AppDock.tsx`
- Load APEX DAN into AI system: Use `system-prompt.md`

---

**Status:** 🟢 **PRODUCTION READY**
