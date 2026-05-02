from django.contrib import admin
from .models import Experience


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['role', 'company', 'start_date', 'end_date', 'is_leadership']
    list_filter = ['is_leadership', 'start_date']
    search_fields = ['role', 'company', 'description']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('role', 'company', 'location', 'start_date', 'end_date')
        }),
        ('Details', {
            'fields': ('description', 'achievements', 'technologies')
        }),
        ('Image', {
            'fields': ('image',),
            'description': 'Upload an image representing this role (e.g., you in the office, at an event, etc.)'
        }),
        ('Settings', {
            'fields': ('is_leadership', 'order'),
            'classes': ('collapse',)
        }),
    )
