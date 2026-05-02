from django.contrib import admin
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'title', 'email', 'location']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'title', 'tagline', 'email', 'location')
        }),
        ('About', {
            'fields': ('description',)
        }),
        ('Images', {
            'fields': ('profile_image', 'about_image', 'journey_image'),
            'description': 'Upload different images for each section:<br>'
                          '<strong>Profile image:</strong> Hero section (circular frame)<br>'
                          '<strong>About image:</strong> About Me section (portrait frame)<br>'
                          '<strong>Journey image:</strong> My Journey section (portrait frame)'
        }),
        ('Files', {
            'fields': ('resume',),
            'classes': ('collapse',)
        }),
        ('Social Links', {
            'fields': ('github', 'linkedin'),
            'classes': ('collapse',)
        }),
    )
    
    def has_add_permission(self, request):
        # Only allow adding if no profile exists
        return not Profile.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion
        return False
