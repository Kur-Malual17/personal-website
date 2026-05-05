"""
Django management command to upload local media files to R2
Can be run on Railway: python manage.py upload_to_r2
"""
from django.core.management.base import BaseCommand
from django.core.files.storage import default_storage
from django.conf import settings
from pathlib import Path
import os


class Command(BaseCommand):
    help = 'Upload local media files to Cloudflare R2'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be uploaded without actually uploading',
        )
        parser.add_argument(
            '--force',
            action='store_true',
            help='Overwrite existing files in R2',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        force = options['force']
        
        self.stdout.write("=" * 70)
        self.stdout.write(self.style.SUCCESS("UPLOAD MEDIA FILES TO R2"))
        self.stdout.write("=" * 70)
        
        # Check if R2 is enabled
        if not getattr(settings, 'USE_R2_STORAGE', False):
            self.stdout.write(self.style.ERROR("❌ USE_R2_STORAGE is False"))
            self.stdout.write("Set USE_R2_STORAGE=True in environment variables")
            return
        
        # Show configuration
        self.stdout.write(f"\nBucket: {settings.AWS_STORAGE_BUCKET_NAME}")
        self.stdout.write(f"Location: {settings.AWS_LOCATION}")
        self.stdout.write(f"Endpoint: {getattr(settings, 'AWS_S3_ENDPOINT_URL', 'Not set')}")
        
        if dry_run:
            self.stdout.write(self.style.WARNING("\n🔍 DRY RUN MODE - No files will be uploaded"))
        
        self.stdout.write("\n" + "=" * 70 + "\n")
        
        # Check if media root exists
        media_root = Path(settings.MEDIA_ROOT)
        if not media_root.exists():
            self.stdout.write(self.style.ERROR(f"❌ Media root does not exist: {media_root}"))
            return
        
        # Upload files
        uploaded_count = 0
        skipped_count = 0
        error_count = 0
        
        for file_path in media_root.rglob('*'):
            if file_path.is_file():
                # Get relative path from media root
                relative_path = file_path.relative_to(media_root)
                r2_path = str(relative_path).replace('\\', '/')
                
                # Check if file exists in R2
                exists = default_storage.exists(r2_path)
                
                if exists and not force:
                    self.stdout.write(f"⏭️  Skipping (exists): {r2_path}")
                    skipped_count += 1
                    continue
                
                if dry_run:
                    action = "Would upload" if not exists else "Would overwrite"
                    self.stdout.write(f"🔍 {action}: {r2_path}")
                    uploaded_count += 1
                    continue
                
                # Upload file
                try:
                    with open(file_path, 'rb') as f:
                        if exists:
                            # Delete existing file first
                            default_storage.delete(r2_path)
                            self.stdout.write(f"🔄 Overwriting: {r2_path}")
                        else:
                            self.stdout.write(f"⬆️  Uploading: {r2_path}")
                        
                        default_storage.save(r2_path, f)
                    uploaded_count += 1
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"❌ Failed: {r2_path} - {e}"))
                    error_count += 1
        
        # Summary
        self.stdout.write("\n" + "=" * 70)
        if dry_run:
            self.stdout.write(self.style.SUCCESS(f"🔍 Would upload: {uploaded_count} files"))
        else:
            self.stdout.write(self.style.SUCCESS(f"✅ Uploaded: {uploaded_count} files"))
        self.stdout.write(f"⏭️  Skipped: {skipped_count} files")
        if error_count > 0:
            self.stdout.write(self.style.ERROR(f"❌ Errors: {error_count} files"))
        self.stdout.write("=" * 70)
        
        if dry_run:
            self.stdout.write("\nRun without --dry-run to actually upload files")
        elif uploaded_count > 0:
            self.stdout.write("\n✅ Files uploaded successfully!")
            self.stdout.write("Test in browser:")
            self.stdout.write(f"  {settings.MEDIA_URL}profile/WhatsApp_Image_2026-05-03_at_00.25.58.jpeg")
