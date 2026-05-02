import requests

# Test education logo
edu_response = requests.get('http://localhost:8000/api/education/')
print("Education API Response:")
print(edu_response.json())
print("\n")

# Test projects
projects_response = requests.get('http://localhost:8000/api/projects/')
print("Projects API Response (first 2):")
projects = projects_response.json()
for project in projects[:2]:
    print(f"Title: {project['title']}")
    print(f"Image: {project['image']}")
    if project['image']:
        # Test if image is accessible
        img_response = requests.head(project['image'])
        print(f"Image Status: {img_response.status_code}")
        print(f"Image Headers: {dict(img_response.headers)}")
    print("\n")
