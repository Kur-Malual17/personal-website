from django.db import models


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Mobile', 'Mobile'),
        ('Database', 'Database'),
        ('AI/ML', 'AI/ML'),
        ('Tools', 'Tools'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    level = models.IntegerField(default=5, help_text='Skill level from 1-10')
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['category', 'order']
    
    def __str__(self):
        return f"{self.name} ({self.category})"
