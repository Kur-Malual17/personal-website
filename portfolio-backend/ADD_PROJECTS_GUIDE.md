# Complete Guide: Add Projects to Production

## Method 1: Load Fixtures (Recommended - Fastest)

### Step 1: Commit and push the fixtures file
```bash
git add fixtures.json
git commit -m "Add projects and experience fixtures"
git push
```

### Step 2: Run on Railway
After deployment, run this command on Railway:
```bash
python manage.py loaddata fixtures.json
```

This will automatically create all 7 projects and 1 experience entry.

---

## Method 2: Manual Entry via Django Admin

Go to: `https://personal-website-production-643f.up.railway.app/admin/projects/project/add/`

### Project 1: SuddTech Company Website
```
Title: SuddTech Company Website
Slug: (leave blank - auto-generated)
Description: Official website for SuddTech, a software company offering web, app, and digital product services.
Category: Web
Technologies: HTML, CSS, JavaScript
GitHub URL: https://github.com/Kur-Malual17/SouthSudan-e-Services
Live URL: https://suddtech.com
Image: Upload from media/projects/ChatGPT_Image_Apr_20_2026_10_51_55_PM.png
Featured: ✅ YES
Status: Live
Impact: (leave blank)
```

### Project 2: Digital School Management System (DSMS)
```
Title: Digital School Management System (DSMS)
Slug: (leave blank - auto-generated)
Description: Enterprise school platform deployed in 3 secondary schools in Juba. Handles student registration, attendance, grading, fee management, teacher dashboards, and course registration. Works online and offline.
Category: Systems
Technologies: Django, PostgreSQL, JavaScript, REST APIs
GitHub URL: (leave blank)
Live URL: https://suddtech.com
Image: Upload from media/projects/ChatGPT_Image_Apr_20_2026_11_01_22_PM.png
Featured: ✅ YES
Status: Live
Impact: (leave blank)
```

### Project 3: Eco-Adventure Tourism Platform
```
Title: Eco-Adventure Tourism Platform
Slug: (leave blank - auto-generated)
Description: Travel booking platform for selecting destinations, reserving accommodations, and completing payments online.
Category: Web
Technologies: HTML, CSS, JavaScript, PHP
GitHub URL: (leave blank)
Live URL: (leave blank)
Image: (no image)
Featured: ❌ NO
Status: Completed
Impact: (leave blank)
```

### Project 4: Ashesi Market E-Commerce
```
Title: Ashesi Market E-Commerce
Slug: (leave blank - auto-generated)
Description: Campus marketplace enabling student vendors to list products, accept payments, and allow peer-to-peer borrowing.
Category: Web
Technologies: React, Node.js, Database Management
GitHub URL: (leave blank)
Live URL: (leave blank)
Image: (no image)
Featured: ❌ NO
Status: Completed
Impact: (leave blank)
```

### Project 5: Agricultural Management Platform
```
Title: Agricultural Management Platform
Slug: (leave blank - auto-generated)
Description: Connects farmers, equipment owners, transporters, and buyers on a single platform to reduce agricultural logistics disconnection.
Category: Web
Technologies: React, Django, CSS, MySQL
GitHub URL: (leave blank)
Live URL: (leave blank)
Image: (no image)
Featured: ❌ NO
Status: Completed
Impact: (leave blank)
```

### Project 6: SpeedyServe Food Delivery
```
Title: SpeedyServe Food Delivery
Slug: (leave blank - auto-generated)
Description: Mobile app for ordering food from local restaurants with real-time delivery tracking and integrated payments.
Category: Mobile
Technologies: Flutter, Firebase, Dart
GitHub URL: (leave blank)
Live URL: (leave blank)
Image: (no image)
Featured: ❌ NO
Status: Completed
Impact: (leave blank)
```

### Project 7: Resume Screening AI App
```
Title: Resume Screening AI App
Slug: (leave blank - auto-generated)
Description: Intelligent hiring tool using NLP and ML to match resumes to job descriptions and rank candidates by relevance.
Category: AI
Technologies: Python, Machine Learning, NLP, scikit-learn
GitHub URL: (leave blank)
Live URL: (leave blank)
Image: (no image)
Featured: ❌ NO
Status: Completed
Impact: (leave blank)
```

---

## Experience Entry

Go to: `https://personal-website-production-643f.up.railway.app/admin/experience/experience/`

**Note:** Your current experience entry looks like test data. You should update it with real information.

### Current Entry (needs updating):
```
Role: COMPUTER
Company: 79952027
Location: Accra, Ghana
Start Date: 2026-05-02
End Date: 2026-05-02
Description: (test data - needs real description)
```

### Suggested Real Entry (based on your projects):
```
Role: Founder & CEO
Company: SuddTech
Location: Juba, South Sudan
Start Date: 2024-01-01 (adjust to your actual start date)
End Date: (leave blank if current)
Description: Leading software development and digital strategy. Built DSMS deployed in 3 secondary schools in Juba, handling student registration, attendance, grading, and fee management. Achieved 40% improvement in administrative efficiency.
Achievements: 
- Deployed enterprise school platform used by 3 schools
- Reduced admin workload by 40% through automation
- Led team of developers in building scalable solutions
Technologies: Django, PostgreSQL, JavaScript, REST APIs
Image: Upload a company logo or professional photo
Is Leadership: ✅ YES
Order: 0
```

---

## Image Files to Upload

You'll need these image files from your local `media/projects/` folder:
1. `ChatGPT_Image_Apr_20_2026_10_51_55_PM.png` (for SuddTech Website)
2. `ChatGPT_Image_Apr_20_2026_11_01_22_PM.png` (for DSMS)

For the other projects without images, you can either:
- Leave them blank for now
- Add placeholder images later
- Upload new project screenshots

---

## Recommendation

**Use Method 1 (fixtures)** - it's much faster:
1. Commit `fixtures.json`
2. Push to Railway
3. Run `python manage.py loaddata fixtures.json` on Railway

This will add all projects instantly!
