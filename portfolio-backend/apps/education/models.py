from django.db import models


class Education(models.Model):
    institution = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field = models.CharField(max_length=255)
    start_year = models.IntegerField()
    end_year = models.IntegerField(null=True, blank=True)
    scholarship = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='education/logos/', blank=True, null=True)
    relevant_courses = models.TextField(default='[]', blank=True, help_text='Comma-separated list of courses')
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-start_year']
    
    def __str__(self):
        return f"{self.degree} - {self.institution}"
