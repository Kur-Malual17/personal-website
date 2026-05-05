#!/usr/bin/env python
"""
Upload a specific file to R2 with a custom name
"""
import os
import django

os.environ['USE_R2_STORAGE'] = 'True'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from django.core.files.storage import default_storage
from django.conf import settings
from pathlib import Path

# The file that exists locally
local_file = Path(settings.MEDIA_ROOT) / 'profile' / 'WhatsApp_Image_2026-05-03_at_00.25.58.jpeg'

# The name production database expects
r2_path = 'profile/WhatsApp_Image_2026-05-03_at_20.18.51.jpeg'

print(f"Uploading: {local_file}")
print(f"As: {r2_path}")
print()

if not local_file.exists():
    print(f"❌ Local file not found: {local_file}")
    exit(1)

try:
    with open(local_file, 'rb') as f:
        # Delete if exists
        if default_storage.exists(r2_path):
            default_storage.delete(r2_path)
            print(f"🗑️  Deleted existing file")
        
        # Upload
        default_storage.save(r2_path, f)
        print(f"✅ Uploaded successfully!")
        print()
        print(f"URL: {settings.MEDIA_URL}{r2_path}")
except Exception as e:
    print(f"❌ Error: {e}")
