# 🔧 Image Loading Fix - Quick Start

## The Problem
Images weren't loading because they exist locally but not in Cloudflare R2.

## The Solution (3 Steps)

### 1️⃣ Setup R2 Credentials

**Option A: Interactive Wizard (Recommended)**
```bash
python setup_r2.py
```

**Option B: Manual**
Edit `.env` file and add your R2 credentials.

### 2️⃣ Upload Files to R2
```bash
python upload_media_to_r2.py
```

### 3️⃣ Verify It Works
```bash
python diagnose_r2.py
```

Should show ✅ for URL accessibility test.

## Need More Help?

- 📖 **Detailed Guide**: Read `R2_SETUP_GUIDE.md`
- 📋 **Complete Summary**: Read `FIX_SUMMARY.md`
- 🔍 **Diagnostic Tool**: Run `python diagnose_r2.py`

## Quick Test

After setup, test this URL in your browser:
```
https://pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev/personal-website/media/profile/WhatsApp_Image_2026-05-03_at_00.25.58.jpeg
```

Should show an image (not 404).

## For Production (Railway)

Add these environment variables in Railway dashboard:
```
USE_R2_STORAGE=True
R2_ACCESS_KEY_ID=your-key
R2_SECRET_ACCESS_KEY=your-secret
R2_BUCKET_NAME=personal-website
R2_ENDPOINT_URL=https://YOUR-ACCOUNT-ID.r2.cloudflarestorage.com
```

---

**Status**: ✅ Django settings fixed | ⏳ Waiting for R2 upload
