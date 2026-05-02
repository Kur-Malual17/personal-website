import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from apps.profile.models import Profile

# Check if profile already exists
if Profile.objects.exists():
    profile = Profile.objects.first()
    print(f"Profile already exists: {profile.name}")
    print("You can update it in Django admin at:")
    print("http://localhost:8000/admin/profile/profile/")
else:
    # Create default profile
    profile = Profile.objects.create(
        name='Kur Malual',
        title='Full-Stack Software Engineer | Founder, SuddTech',
        tagline='Building Digital Systems That Work in the Real World',
        description='I am a Software Engineering graduate from African Leadership University and a Computer Science student at Ashesi University. I specialize in full-stack web development, mobile applications, and educational technology. My work focuses on building impactful digital systems used by real institutions across South Sudan.',
        email='kurmalual@gmail.com',
        github='https://github.com/kurmalual',
        linkedin='https://linkedin.com/in/kurmalual',
        location='Accra, Ghana'
    )
    print(f"✓ Created profile: {profile.name}")
    print("\nYou can now upload a profile image in Django admin at:")
    print("http://localhost:8000/admin/profile/profile/")

print("\nProfile details:")
print(f"  Name: {profile.name}")
print(f"  Title: {profile.title}")
print(f"  Email: {profile.email}")
print(f"  Location: {profile.location}")
print(f"  Profile Image: {'Uploaded' if profile.profile_image else 'Not uploaded yet'}")
