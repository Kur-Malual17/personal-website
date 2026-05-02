import requests
import json

try:
    response = requests.get('http://localhost:8000/api/projects/')
    data = response.json()
    
    print(f'✅ API is working!')
    print(f'Total projects: {len(data)}')
    print(f'\nFirst project:')
    print(json.dumps(data[0], indent=2))
    
    # Check if any project has an image
    projects_with_images = [p for p in data if p.get('image')]
    print(f'\nProjects with images: {len(projects_with_images)}')
    if projects_with_images:
        print(f'Example image URL: {projects_with_images[0]["image"]}')
        
except Exception as e:
    print(f'❌ Error: {e}')
