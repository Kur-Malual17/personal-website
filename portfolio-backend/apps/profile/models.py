from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=255, default='Kur Malual')
    title = models.CharField(max_length=255, default='Full-Stack Software Engineer')
    tagline = models.TextField(default='Building Digital Systems That Work in the Real World')
    description = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True, help_text='Main profile image for hero section')
    about_image = models.ImageField(upload_to='profile/about/', blank=True, null=True, help_text='Image for About Me section')
    journey_image = models.ImageField(upload_to='profile/journey/', blank=True, null=True, help_text='Image for My Journey section')
    resume = models.FileField(upload_to='resume/', blank=True, null=True)
    email = models.EmailField(default='kurmalual@gmail.com')
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=255, default='Accra, Ghana')
    
    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profile'
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Ensure only one profile exists
        if not self.pk and Profile.objects.exists():
            raise ValueError('Only one profile can exist')
        return super().save(*args, **kwargs)
