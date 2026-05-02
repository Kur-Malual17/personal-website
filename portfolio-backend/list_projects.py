import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from apps.projects.models import Project

print("=" * 60)
print("ALL PROJECTS IN DATABASE")
print("=" * 60)

projects = Project.objects.all().order_by('-featured', 'title')

for i, project in enumerate(projects, 1):
    print(f"\n{i}. {project.title}")
    print(f"   Slug: {project.slug}")
    print(f"   Category: {project.category}")
    print(f"   Featured: {'Yes' if project.featured else 'No'}")
    print(f"   Status: {project.status}")
    print(f"   Image: {'Uploaded' if project.image else 'No image'}")
    print(f"   Description: {project.description[:80]}...")

print("\n" + "=" * 60)
print(f"TOTAL: {projects.count()} projects")
print(f"Featured: {Project.objects.filter(featured=True).count()}")
print(f"With Images: {Project.objects.exclude(image='').count()}")
print("=" * 60)
