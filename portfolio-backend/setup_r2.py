#!/usr/bin/env python
"""
Interactive R2 setup wizard
"""
import os
from pathlib import Path

def setup_r2():
    print("=" * 70)
    print("CLOUDFLARE R2 SETUP WIZARD")
    print("=" * 70)
    print()
    print("This wizard will help you configure Cloudflare R2 for your portfolio.")
    print()
    
    # Check if .env exists
    env_file = Path('.env')
    if env_file.exists():
        print("⚠️  .env file already exists.")
        response = input("Do you want to update it? (y/n): ").strip().lower()
        if response != 'y':
            print("Aborted.")
            return
    
    print("\n" + "-" * 70)
    print("STEP 1: Get your R2 credentials from Cloudflare")
    print("-" * 70)
    print("1. Go to: https://dash.cloudflare.com/")
    print("2. Navigate to: R2 → Overview")
    print("3. Click: 'Manage R2 API Tokens'")
    print("4. Create a new token with 'Read & Write' permissions")
    print()
    
    access_key = input("Enter R2 Access Key ID: ").strip()
    secret_key = input("Enter R2 Secret Access Key: ").strip()
    
    print("\n" + "-" * 70)
    print("STEP 2: Get your Account ID")
    print("-" * 70)
    print("Find your Account ID in the R2 dashboard (top right)")
    print()
    
    account_id = input("Enter your Cloudflare Account ID: ").strip()
    
    print("\n" + "-" * 70)
    print("STEP 3: Bucket Configuration")
    print("-" * 70)
    
    bucket_name = input("Enter bucket name [personal-website]: ").strip() or "personal-website"
    
    # Generate .env content
    env_content = f"""# Django Settings
SECRET_KEY=django-insecure-local-dev-key-change-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Cloudflare R2 Storage
USE_R2_STORAGE=True
R2_ACCESS_KEY_ID={access_key}
R2_SECRET_ACCESS_KEY={secret_key}
R2_BUCKET_NAME={bucket_name}
R2_ENDPOINT_URL=https://{account_id}.r2.cloudflarestorage.com
"""
    
    # Write .env file
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("\n" + "=" * 70)
    print("✅ .env file created successfully!")
    print("=" * 70)
    print()
    print("Next steps:")
    print("1. Ensure R2 bucket has public access enabled")
    print("2. Run: python upload_media_to_r2.py")
    print("3. Run: python diagnose_r2.py (to verify)")
    print()
    print("For production (Railway), add these environment variables:")
    print(f"  USE_R2_STORAGE=True")
    print(f"  R2_ACCESS_KEY_ID={access_key}")
    print(f"  R2_SECRET_ACCESS_KEY={secret_key[:10]}...")
    print(f"  R2_BUCKET_NAME={bucket_name}")
    print(f"  R2_ENDPOINT_URL=https://{account_id}.r2.cloudflarestorage.com")
    print()

if __name__ == '__main__':
    try:
        setup_r2()
    except KeyboardInterrupt:
        print("\n\nAborted.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
