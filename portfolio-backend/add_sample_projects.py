"""
Sample script to add projects to the database.
Run this from the Django project root: python manage.py shell < add_sample_projects.py
"""

from apps.projects.models import Project

# Sample projects data
projects_data = [
    {
        'title': 'Digital School Management System (DSMS)',
        'description': 'Enterprise school platform deployed in 3 secondary schools in Juba. Handles student registration, attendance, grading, fee management, teacher dashboards, and course registration.',
        'category': 'Systems',
        'technologies': 'Django,PostgreSQL,JavaScript,REST APIs',
        'github_url': 'https://github.com',
        'live_url': 'https://dsms.suddtech.com',
        'featured': True,
        'status': 'Live',
        'impact': 'Used by 3 schools | 40% efficiency improvement',
    },
    {
        'title': 'Resume Screening AI App',
        'description': 'Intelligent hiring tool using NLP and ML to match resumes to job descriptions and rank candidates by relevance.',
        'category': 'AI',
        'technologies': 'Python,Machine Learning,NLP,scikit-learn',
        'github_url': 'https://github.com',
        'featured': False,
        'status': 'Completed',
    },
    {
        'title': 'SpeedyServe Food Delivery App',
        'description': 'Mobile app for ordering food from local restaurants with real-time delivery tracking and integrated payments.',
        'category': 'Mobile',
        'technologies': 'Flutter,Firebase,Dart',
        'github_url': 'https://github.com',
        'featured': False,
        'status': 'Completed',
    },
    {
        'title': 'Agricultural Management Platform',
        'description': 'Connects farmers, equipment owners, transporters, and buyers on a single platform to reduce agricultural logistics disconnection.',
        'category': 'Web',
        'technologies': 'React,Django,CSS,MySQL',
        'github_url': 'https://github.com',
        'featured': False,
        'status': 'Completed',
    },
    {
        'title': 'Ashesi Market E-Commerce',
        'description': 'Campus marketplace enabling student vendors to list products, accept payments, and allow peer-to-peer borrowing.',
        'category': 'Web',
        'technologies': 'React,Node.js,Database Management',
        'github_url': 'https://github.com',
        'featured': False,
        'status': 'Completed',
    },
    {
        'title': 'Eco-Adventure Tourism Platform',
        'description': 'Travel booking platform for selecting destinations, reserving accommodations, and completing payments online.',
        'category': 'Web',
        'technologies': 'HTML,CSS,JavaScript',
        'github_url': 'https://github.com',
        'featured': False,
        'status': 'Completed',
    },
    {
        'title': 'SuddTech Company Website',
        'description': 'Official website for SuddTech, a software company offering web, app, and digital product services.',
        'category': 'Web',
        'technologies': 'HTML,CSS,JavaScript',
        'github_url': 'https://github.com',
        'live_url': 'https://suddtech.com',
        'featured': False,
        'status': 'Live',
    },
]

# Create projects
for project_data in projects_data:
    project, created = Project.objects.get_or_create(
        title=project_data['title'],
        defaults=project_data
    )
    if created:
        print(f"✓ Created: {project.title}")
    else:
        print(f"- Already exists: {project.title}")

print(f"\nTotal projects in database: {Project.objects.count()}")
print(f"Featured projects: {Project.objects.filter(featured=True).count()}")
