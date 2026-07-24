# 🦁 J-A-U-P Command Center

**Apex Lion J-A-U-P Hub** — GitHub Pages + Linux Backend

## Frontend (GitHub Pages)

This is the **Next.js 14 static export** that runs on GitHub Pages.

### Setup

```bash
git clone https://github.com/realjayroc215/Jaupcommandcenter.git
cd Jaupcommandcenter
git checkout frontend-github-pages
npm install
npm run build
mv out docs
git add . && git commit -m "Deploy Command Center"
git push
```

### Enable GitHub Pages

1. Go to **Settings → Pages**
2. Source: `Deploy from branch`
3. Branch: `main` (or your branch)
4. Folder: `/docs`
5. Save

Your Command Center is live at: `https://realjayroc215.github.io/Jaupcommandcenter`

## Backend (Linux Server)

See the `backend-setup` branch for Node.js + Express server:

- Camera feed proxy (FFmpeg + RTSP)
- J-A-U-P Brain API
- systemd service

## Architecture

```
┌─────────────────────────────────────────┐
│  GitHub Pages (Frontend)                │
│  - Command Center UI                    │
│  - All modules & panels                 │
│  - Apex Lion branding                   │
└──────────────┬──────────────────────────┘
               │
        HTTPS API calls
               │
┌──────────────▼──────────────────────────┐
│  Linux Server (Backend)                 │
│  - Camera proxy (FFmpeg)                │
│  - J-A-U-P Brain kernel                 │
│  - Device endpoints                     │
└─────────────────────────────────────────┘
```

## Next Steps

- [ ] Apex Lion animated branding
- [ ] 500-app dock integration
- [ ] Real camera streams
- [ ] Brain API integration
- [ ] Deploy backend
