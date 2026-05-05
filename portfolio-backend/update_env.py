#!/usr/bin/env python
"""
Quick script to update .env with R2 credentials
"""

print("=" * 70)
print("UPDATE .ENV WITH R2 CREDENTIALS")
print("=" * 70)
print()
print("You can get these from:")
print("1. Railway Variables tab (copy existing values)")
print("2. Cloudflare Dashboard → R2 → Manage R2 API Tokens")
print()
print("Paste your credentials below:")
print()

access_key = input("R2_ACCESS_KEY_ID: ").strip()
secret_key = input("R2_SECRET_ACCESS_KEY: ").strip()
endpoint_url = input("R2_ENDPOINT_URL (e.g., https://abc123.r2.cloudflarestorage.com): ").strip()

# Read current .env
with open('.env', 'r') as f:
    lines = f.readlines()

# Update the values
new_lines = []
for line in lines:
    if line.startswith('R2_ACCESS_KEY_ID='):
        new_lines.append(f'R2_ACCESS_KEY_ID={access_key}\n')
    elif line.startswith('R2_SECRET_ACCESS_KEY='):
        new_lines.append(f'R2_SECRET_ACCESS_KEY={secret_key}\n')
    elif line.startswith('R2_ENDPOINT_URL='):
        new_lines.append(f'R2_ENDPOINT_URL={endpoint_url}\n')
    else:
        new_lines.append(line)

# Write back
with open('.env', 'w') as f:
    f.writelines(new_lines)

print()
print("✅ .env file updated!")
print()
print("Next steps:")
print("1. Run: python diagnose_r2.py (to verify)")
print("2. Run: python upload_media_to_r2.py (to upload files)")
print()
