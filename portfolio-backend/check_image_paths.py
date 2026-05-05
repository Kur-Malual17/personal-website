#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from apps.profile.models import Profile
from apps.education.models import Education
from apps.experience.models import Experience
from apps.projects.models import Project

print("=== Checking Image Paths in Database ===\n")

# Check Profile
profiles = Profile.objects.all()
for p in profiles:
    print(f"Profile: {p.name}")
    print(f"  profile_image: {p.profile_image}")
    print(f"  profile_image.url: {p.profile_image.url if p.profile_image else 'None'}")
    print(f"  about_image: {p.about_image}")
    print(f"  journey_image: {p.journey_image}")
    print()

# Check Education
educations = Education.objects.all()
for e in educations:
    print(f"Education: {e.institution}")
    print(f"  logo: {e.logo}")
    print(f"  logo.url: {e.logo.url if e.logo else 'None'}")
    print()

# Check Experience
experiences = Experience.objects.all()
for exp in experiences:
    print(f"Experience: {exp.role}")
    print(f"  image: {exp.image}")
    print(f"  image.url: {exp.image.url if exp.image else 'None'}")
    print()

# Check Projects
projects = Project.objects.all()
for proj in projects:
    print(f"Project: {proj.title}")
    print(f"  image: {proj.image}")
    print(f"  image.url: {proj.image.url if proj.image else 'None'}")
    print()
