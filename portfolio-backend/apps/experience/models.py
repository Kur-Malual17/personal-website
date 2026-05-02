from django.db import models


class Experience(models.Model):
    role = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()
    achievements = models.TextField(blank=True, help_text='Comma-separated list of achievements')
    technologies = models.TextField(blank=True, help_text='Comma-separated list of technologies')
    image = models.ImageField(upload_to='experience/', blank=True, null=True, help_text='Image representing this role/position')
    is_leadership = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-start_date']
    
    def __str__(self):
        return f"{self.role} at {self.company}"
