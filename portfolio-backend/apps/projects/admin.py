from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'status', 'featured', 'created_at']
    list_filter = ['category', 'status', 'featured']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['featured', 'status']
    ordering = ['-featured', '-created_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'category')
        }),
        ('Technical Details', {
            'fields': ('technologies', 'status')
        }),
        ('Links & Media', {
            'fields': ('github_url', 'live_url', 'image')
        }),
        ('Additional Info', {
            'fields': ('featured', 'impact')
        }),
    )
    
    def save_model(self, request, obj, form, change):
        # Ensure technologies is stored properly
        if isinstance(obj.technologies, list):
            obj.technologies = ','.join(obj.technologies)
        super().save_model(request, obj, form, change)
