#!/usr/bin/env python
"""
Comprehensive R2 configuration diagnostic
"""
import os
import django
import requests

os.environ['USE_R2_STORAGE'] = 'True'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from django.conf import settings
from apps.profile.models import Profile
from apps.education.models import Education
from pathlib import Path

print("=" * 70)
print("CLOUDFLARE R2 DIAGNOSTIC REPORT")
print("=" * 70)

# 1. Configuration Check
print("\n1. CONFIGURATION")
print("-" * 70)
print(f"USE_R2_STORAGE: {settings.USE_R2_STORAGE}")
print(f"AWS_STORAGE_BUCKET_NAME: {settings.AWS_STORAGE_BUCKET_NAME}")
print(f"AWS_LOCATION: {settings.AWS_LOCATION}")
print(f"AWS_S3_CUSTOM_DOMAIN: {settings.AWS_S3_CUSTOM_DOMAIN}")
print(f"AWS_S3_ENDPOINT_URL: {getattr(settings, 'AWS_S3_ENDPOINT_URL', 'Not set')}")
print(f"MEDIA_URL: {settings.MEDIA_URL}")

# 2. Environment Variables Check
print("\n2. ENVIRONMENT VARIABLES")
print("-" * 70)
env_vars = ['R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME', 'R2_ENDPOINT_URL']
for var in env_vars:
    value = os.environ.get(var, 'NOT SET')
    if 'KEY' in var and value != 'NOT SET':
        value = value[:10] + '...' + value[-4:] if len(value) > 14 else '***'
    print(f"{var}: {value}")

# 3. Database Paths Check
print("\n3. DATABASE IMAGE PATHS")
print("-" * 70)
profile = Profile.objects.first()
if profile:
    print(f"Profile image DB path: {profile.profile_image}")
    print(f"Generated URL: {profile.profile_image.url if profile.profile_image else 'None'}")
else:
    print("No profile found")

education = Education.objects.first()
if education:
    print(f"\nEducation logo DB path: {education.logo}")
    print(f"Generated URL: {education.logo.url if education.logo else 'None'}")
else:
    print("\nNo education found")

# 4. Local Files Check
print("\n4. LOCAL MEDIA FILES")
print("-" * 70)
media_root = Path(settings.MEDIA_ROOT)
if media_root.exists():
    file_count = sum(1 for _ in media_root.rglob('*') if _.is_file())
    print(f"Total files in {media_root}: {file_count}")
    print("\nSample files:")
    for i, file_path in enumerate(media_root.rglob('*')):
        if file_path.is_file() and i < 5:
            relative = file_path.relative_to(media_root)
            print(f"  - {relative}")
else:
    print(f"Media root {media_root} does not exist")

# 5. URL Accessibility Check
print("\n5. URL ACCESSIBILITY TEST")
print("-" * 70)
if profile and profile.profile_image:
    test_url = profile.profile_image.url
    print(f"Testing: {test_url}")
    try:
        response = requests.head(test_url, timeout=5)
        if response.status_code == 200:
            print(f"✅ SUCCESS: File is accessible (HTTP {response.status_code})")
        else:
            print(f"❌ FAILED: HTTP {response.status_code}")
            if response.status_code == 404:
                print("   → File not found in R2. Need to upload files.")
            elif response.status_code == 403:
                print("   → Access denied. Check R2 public access settings.")
    except requests.exceptions.RequestException as e:
        print(f"❌ ERROR: {e}")
else:
    print("No profile image to test")

# 6. Recommendations
print("\n6. RECOMMENDATIONS")
print("-" * 70)

issues = []
if not os.environ.get('R2_ACCESS_KEY_ID'):
    issues.append("❌ R2_ACCESS_KEY_ID not set in environment")
if not os.environ.get('R2_SECRET_ACCESS_KEY'):
    issues.append("❌ R2_SECRET_ACCESS_KEY not set in environment")
if not os.environ.get('R2_ENDPOINT_URL'):
    issues.append("❌ R2_ENDPOINT_URL not set in environment")

if issues:
    print("Environment Issues:")
    for issue in issues:
        print(f"  {issue}")
    print("\n  → Set these in your .env file or Railway environment variables")
else:
    print("✅ All environment variables are set")

print("\nNext Steps:")
print("  1. Ensure R2 bucket has public access enabled")
print("  2. Run: python upload_media_to_r2.py")
print("  3. Test URLs in browser")
print("  4. Deploy to production")

print("\n" + "=" * 70)
