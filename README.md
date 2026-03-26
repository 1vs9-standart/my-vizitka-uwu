# 1vs9.dev

Personal vizitka / business card for VRChat.

## Stack

- **Flask** + Gunicorn
- **Docker** (single container, `--network host`)
- Static HTML/CSS, no JavaScript

## Quick Start

```bash
chmod +x up.sh
./up.sh
```

Site runs on `http://localhost:5002`

## Endpoints

| Route     | Description        |
|-----------|--------------------|
| `/`       | Main page          |
| `/health` | Health check (JSON)|

## Project Structure

```
├── app.py              # Flask app + security headers
├── templates/
│   └── index.html      # Single-page template
├── static/
│   ├── static.css      # Styles
│   ├── avatar.png      # Profile picture
│   ├── furry_bg.png    # Background
│   ├── og.png          # Open Graph preview (1200x630)
│   └── knot.ico        # Favicon
├── Dockerfile
├── up.sh               # Build & deploy script
└── requirements.txt
```

## Deploy

`up.sh` builds the image, starts the container with `--restart unless-stopped` (auto-start after reboot), and prunes old images.

Requires Docker.
