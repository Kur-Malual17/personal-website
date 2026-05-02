#!/usr/bin/env python
"""
Image Loading Diagnostic Script
Run this to check if all images are properly configured
"""

import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from apps.education.models import Education
from apps.projects.models import Project
from django.conf import settings

print("=" * 60)
print("IMAGE LOADING DIAGNOSTIC")
print("=" * 60)
print()

# Check settings
print("1. DJANGO SETTINGS")
print("-" * 60)
print(f"MEDIA_URL: {settings.MEDIA_URL}")
print(f"MEDIA_ROOT: {settings.MEDIA_ROOT}")
print(f"DEBUG: {settings.DEBUG}")
print(f"CORS_ALLOW_ALL_ORIGINS: {getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', 'Not set')}")
print()

# Check education logos
print("2. EDUCATION LOGOS")
print("-" * 60)
educations = Education.objects.all()
for edu in educations:
    print(f"\nInstitution: {edu.institution}")
    print(f"  Logo field: {edu.logo}")
    if edu.logo:
        logo_path = os.path.join(settings.MEDIA_ROOT, str(edu.logo))
        exists = os.path.exists(logo_path)
        print(f"  File exists: {exists}")
        if exists:
            size = os.path.getsize(logo_path)
            print(f"  File size: {size:,} bytes")
        print(f"  URL: {settings.MEDIA_URL}{edu.logo}")
    else:
        print(f"  ⚠️  No logo assigned")
print()

# Check project images
print("3. PROJECT IMAGES")
print("-" * 60)
projects = Project.objects.all()
for proj in projects:
    print(f"\nProject: {proj.title}")
    print(f"  Image field: {proj.image}")
    if proj.image:
        image_path = os.path.join(settings.MEDIA_ROOT, str(proj.image))
        exists = os.path.exists(image_path)
        print(f"  File exists: {exists}")
        if exists:
            size = os.path.getsize(image_path)
            print(f"  File size: {size:,} bytes")
        print(f"  URL: {settings.MEDIA_URL}{proj.image}")
    else:
        print(f"  ⚠️  No image assigned")
print()

# Check media directory
print("4. MEDIA DIRECTORY STRUCTURE")
print("-" * 60)
media_root = str(settings.MEDIA_ROOT)
if os.path.exists(media_root):
    for root, dirs, files in os.walk(media_root):
        level = root.replace(media_root, '').count(os.sep)
        indent = ' ' * 2 * level
        print(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 2 * (level + 1)
        for file in files:
            file_path = os.path.join(root, file)
            size = os.path.getsize(file_path)
            print(f'{subindent}{file} ({size:,} bytes)')
else:
    print(f"⚠️  MEDIA_ROOT does not exist: {media_root}")
print()

# Summary
print("5. SUMMARY")
print("-" * 60)
edu_with_logos = Education.objects.exclude(logo='').exclude(logo=None).count()
edu_total = Education.objects.count()
proj_with_images = Project.objects.exclude(image='').exclude(image=None).count()
proj_total = Project.objects.count()

print(f"Education records with logos: {edu_with_logos}/{edu_total}")
print(f"Project records with images: {proj_with_images}/{proj_total}")
print()

if edu_with_logos < edu_total:
    print(f"⚠️  {edu_total - edu_with_logos} education record(s) missing logos")
if proj_with_images < proj_total:
    print(f"⚠️  {proj_total - proj_with_images} project record(s) missing images")

print()
print("=" * 60)
print("DIAGNOSTIC COMPLETE")
print("=" * 60)
print()
print("Next steps:")
print("1. If files don't exist, upload them via Django admin")
print("2. If URLs are wrong, check MEDIA_URL in settings.py")
print("3. Test image URLs in browser: http://localhost:8000/media/...")
print("4. Check frontend console for CORS or loading errors")
