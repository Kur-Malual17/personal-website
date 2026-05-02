import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from apps.projects.models import Project

# Clear existing projects (optional - comment out if you want to keep existing ones)
# Project.objects.all().delete()

projects_data = [
    {
        'title': 'Digital School Management System (DSMS)',
        'slug': 'dsms',
        'description': 'Enterprise school platform deployed in 3 secondary schools in Juba. Handles student registration, attendance, grading, fee management, teacher dashboards, and course registration. Works online and offline.',
        'category': 'Systems',
        'technologies': 'Django, PostgreSQL, JavaScript, REST APIs',
        'github_url': '',
        'live_url': '',
        'featured': True,
        'status': 'Live'
    },
    {
        'title': 'Resume Screening AI App',
        'slug': 'resume-screening-ai',
        'description': 'Intelligent hiring tool using NLP and ML to match resumes to job descriptions and rank candidates by relevance.',
        'category': 'AI',
        'technologies': 'Python, Machine Learning, NLP, scikit-learn',
        'github_url': '',
        'live_url': '',
        'featured': False,
        'status': 'Completed'
    },
    {
        'title': 'SpeedyServe Food Delivery',
        'slug': 'speedyserve',
        'description': 'Mobile app for ordering food from local restaurants with real-time delivery tracking and integrated payments.',
        'category': 'Mobile',
        'technologies': 'Flutter, Firebase, Dart',
        'github_url': '',
        'live_url': '',
        'featured': False,
        'status': 'Completed'
    },
    {
        'title': 'Agricultural Management Platform',
        'slug': 'agricultural-platform',
        'description': 'Connects farmers, equipment owners, transporters, and buyers on a single platform to reduce agricultural logistics disconnection.',
        'category': 'Web',
        'technologies': 'React, Django, CSS, MySQL',
        'github_url': '',
        'live_url': '',
        'featured': False,
        'status': 'Completed'
    },
    {
        'title': 'Ashesi Market E-Commerce',
        'slug': 'ashesi-market',
        'description': 'Campus marketplace enabling student vendors to list products, accept payments, and allow peer-to-peer borrowing.',
        'category': 'Web',
        'technologies': 'React, Node.js, Database Management',
        'github_url': '',
        'live_url': '',
        'featured': False,
        'status': 'Completed'
    },
    {
        'title': 'Eco-Adventure Tourism Platform',
        'slug': 'eco-adventure',
        'description': 'Travel booking platform for selecting destinations, reserving accommodations, and completing payments online.',
        'category': 'Web',
        'technologies': 'HTML, CSS, JavaScript, PHP',
        'github_url': '',
        'live_url': '',
        'featured': False,
        'status': 'Completed'
    },
    {
        'title': 'SuddTech Company Website',
        'slug': 'suddtech-website',
        'description': 'Official website for SuddTech, a software company offering web, app, and digital product services.',
        'category': 'Web',
        'technologies': 'HTML, CSS, JavaScript',
        'github_url': '',
        'live_url': '',
        'featured': False,
        'status': 'Live'
    }
]

print("Adding projects to database...")
for project_data in projects_data:
    project, created = Project.objects.get_or_create(
        slug=project_data['slug'],
        defaults=project_data
    )
    if created:
        print(f"✓ Created: {project.title}")
    else:
        # Update existing project
        for key, value in project_data.items():
            setattr(project, key, value)
        project.save()
        print(f"✓ Updated: {project.title}")

print(f"\nTotal projects in database: {Project.objects.count()}")
print("\nFeatured projects:")
for project in Project.objects.filter(featured=True):
    print(f"  - {project.title}")

print("\nDone! You can now upload images in Django admin at:")
print("http://localhost:8000/admin/projects/project/")
