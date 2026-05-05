#!/usr/bin/env python
import os
import django

# Set to use R2 storage for this test
os.environ['USE_R2_STORAGE'] = 'True'
os.environ['R2_BUCKET_NAME'] = 'personal-website'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from django.conf import settings
from apps.profile.models import Profile
from apps.education.models import Education

print("=== R2 Storage Configuration ===")
print(f"USE_R2_STORAGE: {settings.USE_R2_STORAGE}")
print(f"AWS_STORAGE_BUCKET_NAME: {settings.AWS_STORAGE_BUCKET_NAME}")
print(f"AWS_LOCATION: {settings.AWS_LOCATION}")
print(f"AWS_S3_CUSTOM_DOMAIN: {settings.AWS_S3_CUSTOM_DOMAIN}")
print(f"MEDIA_URL: {settings.MEDIA_URL}")
print()

print("=== Generated URLs ===")

# Check Profile
profile = Profile.objects.first()
if profile and profile.profile_image:
    print(f"Profile image path in DB: {profile.profile_image}")
    print(f"Generated URL: {profile.profile_image.url}")
    print()

# Check Education
education = Education.objects.first()
if education and education.logo:
    print(f"Education logo path in DB: {education.logo}")
    print(f"Generated URL: {education.logo.url}")
    print()

print("\n=== Expected URL ===")
print("https://pub-d0db390aa0bb494dacc74859a0231ff7.r2.dev/personal-website/media/profile/WhatsApp_Image_2026-05-03_at_00.25.58.jpeg")
