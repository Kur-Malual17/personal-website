#!/usr/bin/env python
"""
Upload all local media files to Cloudflare R2
"""
import os
import django
from pathlib import Path

os.environ['USE_R2_STORAGE'] = 'True'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from django.core.files.storage import default_storage
from django.conf import settings

def upload_directory(local_dir, r2_prefix=''):
    """Recursively upload a directory to R2"""
    local_path = Path(local_dir)
    
    if not local_path.exists():
        print(f"Directory {local_dir} does not exist")
        return
    
    uploaded_count = 0
    skipped_count = 0
    
    for file_path in local_path.rglob('*'):
        if file_path.is_file():
            # Get relative path from media root
            relative_path = file_path.relative_to(settings.MEDIA_ROOT)
            r2_path = str(relative_path).replace('\\', '/')  # Ensure forward slashes
            
            # Check if file already exists in R2
            if default_storage.exists(r2_path):
                print(f"⏭️  Skipping (already exists): {r2_path}")
                skipped_count += 1
                continue
            
            # Upload file
            try:
                with open(file_path, 'rb') as f:
                    default_storage.save(r2_path, f)
                print(f"✅ Uploaded: {r2_path}")
                uploaded_count += 1
            except Exception as e:
                print(f"❌ Failed to upload {r2_path}: {e}")
    
    return uploaded_count, skipped_count

if __name__ == '__main__':
    print("=" * 60)
    print("Uploading Media Files to Cloudflare R2")
    print("=" * 60)
    print(f"Bucket: {settings.AWS_STORAGE_BUCKET_NAME}")
    print(f"Location: {settings.AWS_LOCATION}")
    print(f"Endpoint: {settings.AWS_S3_ENDPOINT_URL}")
    print("=" * 60)
    print()
    
    # Upload all media files
    uploaded, skipped = upload_directory(settings.MEDIA_ROOT)
    
    print()
    print("=" * 60)
    print(f"✅ Uploaded: {uploaded} files")
    print(f"⏭️  Skipped: {skipped} files")
    print("=" * 60)
