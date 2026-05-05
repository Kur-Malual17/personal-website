# Image Loading Issue - FIXED ✅

## What Was Wrong

Your frontend was trying to load images from Cloudflare R2, but:
1. ❌ Files were never uploaded to R2
2. ❌ R2 credentials weren't configured locally
3. ❌ Settings had incorrect path configuration (now fixed)

## What Was Fixed

### 1. Django Settings (✅ DONE)
- Fixed `AWS_S3_CUSTOM_DOMAIN` to include bucket name in path
- Fixed `MEDIA_URL` to generate correct public URLs
- Added `.env` file support with `python-dotenv`

**Generated URLs now look like:**
```
https://pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev/personal-website/media/profile/image.jpeg
```

### 2. Created Helper Scripts (✅ DONE)
- `diagnose_r2.py` - Check R2 configuration
- `upload_media_to_r2.py` - Upload local files to R2
- `check_image_paths.py` - Verify database paths
- `R2_SETUP_GUIDE.md` - Complete setup instructions

## What You Need to Do

### Step 1: Get R2 Credentials from Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** → **Overview**
3. Click **Manage R2 API Tokens**
4. Create a new API token with **Read & Write** permissions
5. Copy the **Access Key ID** and **Secret Access Key**
6. Note your **Account ID** (shown in the R2 dashboard)

### Step 2: Update `.env` File

Edit `portfolio-backend/.env` and replace these values:

```env
R2_ACCESS_KEY_ID=your-actual-access-key-here
R2_SECRET_ACCESS_KEY=your-actual-secret-key-here
R2_ENDPOINT_URL=https://YOUR-ACCOUNT-ID.r2.cloudflarestorage.com
```

Replace `YOUR-ACCOUNT-ID` with your actual Cloudflare account ID.

### Step 3: Enable R2 Public Access

1. In Cloudflare Dashboard → R2
2. Select your `personal-website` bucket
3. Go to **Settings** → **Public Access**
4. Click **Allow Access** or **Connect Domain**
5. Verify the public URL is: `pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev`

### Step 4: Upload Files to R2

```bash
cd portfolio-backend
python upload_media_to_r2.py
```

This will upload all 18 files from your local `media/` folder to R2.

### Step 5: Verify It Works

```bash
python diagnose_r2.py
```

Should show:
- ✅ All environment variables set
- ✅ URL accessibility test passes (HTTP 200)

### Step 6: Update Production (Railway)

Add these environment variables in Railway:

```
USE_R2_STORAGE=True
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=personal-website
R2_ENDPOINT_URL=https://YOUR-ACCOUNT-ID.r2.cloudflarestorage.com
```

Then redeploy your backend.

## Testing

After uploading, test in browser:
```
https://pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev/personal-website/media/profile/WhatsApp_Image_2026-05-03_at_00.25.58.jpeg
```

Should display the image (not 404).

## Alternative: Use Local Files (Development)

If you don't want to use R2 for local development:

1. Set `USE_R2_STORAGE=False` in `.env`
2. Run Django backend: `python manage.py runserver`
3. Update frontend API URL to: `http://localhost:8000`

Images will be served from `http://localhost:8000/media/...`

## Files Created

- ✅ `portfolio-backend/.env` - Environment variables
- ✅ `portfolio-backend/diagnose_r2.py` - Diagnostic tool
- ✅ `portfolio-backend/upload_media_to_r2.py` - Upload script
- ✅ `portfolio-backend/R2_SETUP_GUIDE.md` - Detailed guide
- ✅ `portfolio-backend/FIX_SUMMARY.md` - This file

## Need Help?

Run diagnostics anytime:
```bash
python diagnose_r2.py
```

This will show you exactly what's configured and what's missing.
