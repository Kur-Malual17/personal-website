from apps.projects.models import Project

print(f'Total projects: {Project.objects.count()}')
print(f'Featured: {Project.objects.filter(featured=True).count()}')
print('\nProjects in database:')
for p in Project.objects.all():
    print(f'  - {p.title} ({p.category}) - Featured: {p.featured}')
