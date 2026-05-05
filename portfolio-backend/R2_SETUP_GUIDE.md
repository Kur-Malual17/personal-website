# Cloudflare R2 Setup Guide

## Current Status

✅ Django settings are configured correctly  
✅ Database has correct image paths  
✅ Local media files exist  
❌ **Files need to be uploaded to R2**  
❌ **R2 bucket needs public access configuration**

## The Problem

Your frontend is trying to load images from:
```
https://pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev/personal-website/media/profile/...
```

But these files don't exist in R2 yet (they're only local).

## Solution: Upload Files to R2

### Step 1: Verify R2 Environment Variables

Make sure these are set in your Railway/production environment:

```bash
USE_R2_STORAGE=True
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=personal-website
R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
```

### Step 2: Configure R2 Bucket for Public Access

1. Go to Cloudflare Dashboard → R2
2. Select your `personal-website` bucket
3. Go to **Settings** → **Public Access**
4. Enable **Public Access** or create a **Custom Domain**
5. The public URL should be: `pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev`

### Step 3: Upload Local Files to R2

Run the upload script:

```bash
cd portfolio-backend
python upload_media_to_r2.py
```

This will upload all files from your local `media/` folder to R2.

### Step 4: Verify Upload

After uploading, test if files are accessible:

```bash
curl -I https://pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev/personal-website/media/profile/WhatsApp_Image_2026-05-03_at_00.25.58.jpeg
```

Should return `200 OK` instead of `404 Not Found`.

## Alternative: Use Local Files (Development Only)

If you want to test locally without R2:

1. Set `USE_R2_STORAGE=False` in your `.env`
2. Make sure your backend is running
3. Update frontend to use local backend URL: `http://localhost:8000/media/...`

## File Structure in R2

With current settings, files will be stored as:

```
personal-website/              ← Bucket name
└── media/                     ← AWS_LOCATION
    ├── profile/
    │   └── image.jpg
    ├── education/
    │   └── logos/
    │       └── logo.png
    ├── experience/
    ├── projects/
    └── skills/
```

Public URLs will be:
```
https://pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev/personal-website/media/profile/image.jpg
```

## Troubleshooting

### Images still not loading?

1. **Check R2 public access**: Bucket must allow public reads
2. **Check CORS**: R2 bucket needs CORS policy for your frontend domain
3. **Check file paths**: Run `python check_image_paths.py` to see generated URLs
4. **Check R2 contents**: Use Cloudflare dashboard to verify files exist

### CORS Configuration for R2

Add this CORS policy to your R2 bucket:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

## Next Steps

1. ✅ Settings are fixed (already done)
2. ⏳ Upload files to R2 (run `upload_media_to_r2.py`)
3. ⏳ Verify R2 public access is enabled
4. ⏳ Test image URLs in browser
5. ⏳ Deploy updated settings to production
