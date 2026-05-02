from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('Systems', 'Systems'),
        ('Web', 'Web'),
        ('Mobile', 'Mobile'),
        ('AI', 'AI'),
    ]
    
    STATUS_CHOICES = [
        ('Live', 'Live'),
        ('Completed', 'Completed'),
        ('In Progress', 'In Progress'),
    ]
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    technologies = models.TextField(default='[]', help_text='Comma-separated list of technologies')
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    featured = models.BooleanField(default=False)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Completed')
    impact = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-featured', '-created_at']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
