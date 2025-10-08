# How to Upload Your SharePoint Files

This guide explains how to replace the placeholder content with your actual SharePoint files.

## 📁 Folder Structure Created

I've created these folders in your project:

```
public/resources/
├── manuals/          (user manuals, handbooks)
├── guides/           (installation guides, how-tos)
├── documentation/    (technical docs, API docs)
└── videos/           (video tutorials - or use external links)
```

## 🔄 Step-by-Step Process

### Step 1: Download Files from SharePoint

1. Go to your SharePoint site
2. Navigate to the documents library
3. Select the files you want to add to the portal
4. Download them to your computer

### Step 2: Upload Files to Project

**Option A: Drag and Drop in Cursor**
1. In Cursor's file explorer (left sidebar), expand `public` → `resources`
2. Drag your downloaded files into the appropriate subfolder:
   - PDFs/manuals → `public/resources/manuals/`
   - Installation guides → `public/resources/guides/`
   - Technical docs → `public/resources/documentation/`

**Option B: Copy via File Explorer**
1. Open Windows File Explorer
2. Navigate to: `C:\Users\Cody.Hopkins\OneDrive\Desktop\Cursor Project\public\resources\`
3. Copy your files into the appropriate subfolders

**Example:**
```
public/resources/manuals/NoTraffic-User-Guide.pdf
public/resources/guides/Installation-Manual.pdf
public/resources/documentation/API-Reference.pdf
```

### Step 3: Update Resource Configuration

Open `data/resources.ts` and update the file paths:

**Before:**
```typescript
{
  id: 1,
  title: 'NoTraffic Platform User Manual',
  description: 'Complete user manual...',
  category: 'manuals',
  type: 'PDF',
  filePath: '/resources/manuals/platform-user-manual.pdf', // ⚠️ Placeholder
  size: '12.5 MB',
  pages: 156,
  version: 'v3.2',
  updated: '2024-10'
}
```

**After (with your actual file):**
```typescript
{
  id: 1,
  title: 'NoTraffic Platform User Manual',
  description: 'Complete user manual...',
  category: 'manuals',
  type: 'PDF',
  filePath: '/resources/manuals/NoTraffic-User-Guide.pdf', // ✅ Your actual file
  size: '8.2 MB',        // Update with actual size
  pages: 142,             // Update with actual pages
  version: 'v3.2',
  updated: '2024-10'      // Update with actual date
}
```

## 📝 Adding New Resources

To add a NEW resource (not replacing placeholders):

```typescript
// In data/resources.ts, add to the resources array:
{
  id: 13,  // Next available ID
  title: 'Your New Document Title',
  description: 'Brief description of what this document covers',
  category: 'manuals',  // or 'guides', 'documentation', 'videos', 'faqs'
  type: 'PDF',          // or 'Video', 'Online', 'DOCX', 'ZIP'
  filePath: '/resources/manuals/your-new-file.pdf',
  size: '5.2 MB',
  pages: 45,
  version: 'v1.0',
  updated: '2024-10'
}
```

## 🎬 For Videos

You have two options for videos:

**Option 1: External Link (Recommended - YouTube, Vimeo, etc.)**
```typescript
{
  id: 7,
  title: 'Installation Video Tutorial',
  category: 'videos',
  type: 'Video',
  externalUrl: 'https://youtube.com/watch?v=your-video-id',  // Use this
  size: 'N/A',
  pages: null,
  version: '2024',
  updated: '2024-10'
}
```

**Option 2: Local Video File**
```typescript
{
  id: 7,
  title: 'Installation Video Tutorial',
  category: 'videos',
  type: 'Video',
  filePath: '/resources/videos/installation-tutorial.mp4',  // Large files!
  size: '250 MB',
  pages: null,
  version: '2024',
  updated: '2024-10'
}
```

## 🔗 For Online Documentation

If you have documentation hosted elsewhere:

```typescript
{
  id: 4,
  title: 'API Documentation',
  category: 'documentation',
  type: 'Online',
  externalUrl: 'https://docs.notraffic.tech/api',  // External link
  size: 'N/A',
  pages: null,
  version: 'v4.0',
  updated: '2024-10'
}
```

## 🗑️ Removing Placeholder Resources

To remove a placeholder resource you don't need:
1. Open `data/resources.ts`
2. Delete or comment out the entire resource object:

```typescript
// {
//   id: 12,
//   title: 'Security Best Practices',
//   ...
// },  // ← Commented out or deleted
```

## 📋 Complete Example Workflow

Let's say you have these SharePoint files:
- `NoTraffic_User_Manual_v3.2.pdf`
- `Quick_Start_Guide.pdf`
- `Troubleshooting_Guide.pdf`

**1. Upload to project:**
```
public/resources/manuals/NoTraffic_User_Manual_v3.2.pdf
public/resources/guides/Quick_Start_Guide.pdf
public/resources/guides/Troubleshooting_Guide.pdf
```

**2. Update `data/resources.ts`:**
```typescript
export const resources: ResourceItem[] = [
  {
    id: 1,
    title: 'NoTraffic Platform User Manual',
    description: 'Complete user manual covering all platform features',
    category: 'manuals',
    type: 'PDF',
    filePath: '/resources/manuals/NoTraffic_User_Manual_v3.2.pdf',  // ✅
    size: '8.5 MB',
    pages: 150,
    version: 'v3.2',
    updated: '2024-10'
  },
  {
    id: 2,
    title: 'Quick Start Guide',
    description: 'Get started quickly with NoTraffic',
    category: 'guides',
    type: 'PDF',
    filePath: '/resources/guides/Quick_Start_Guide.pdf',  // ✅
    size: '2.1 MB',
    pages: 20,
    version: 'v1.0',
    updated: '2024-10'
  },
  // ... more resources
]
```

**3. Refresh your browser**
The files will now be downloadable!

## ⚠️ Important Notes

1. **File Names**: 
   - Avoid spaces in file names (use underscores or hyphens)
   - Good: `User_Manual.pdf` or `User-Manual.pdf`
   - Bad: `User Manual.pdf`

2. **File Size**: 
   - Keep files under 50MB for faster downloads
   - For large videos, use external links (YouTube, Vimeo)

3. **Path Format**:
   - Always start with `/resources/`
   - Example: `/resources/manuals/file.pdf`
   - NOT: `resources/manuals/file.pdf` or `./resources/manuals/file.pdf`

4. **Supported File Types**:
   - PDF (recommended for docs)
   - DOCX (Word documents)
   - ZIP (compressed files)
   - MP4 (videos - but external links preferred)

## 🧪 Testing Your Files

After uploading and updating:

1. Refresh your browser at http://localhost:3000/resources
2. Search for your file
3. Click the "Download" or "View" button
4. File should download or open

## 🆘 Troubleshooting

**File not downloading?**
- Check the `filePath` matches the actual file location
- Make sure file is in the `public/` folder (not `app/` or elsewhere)
- File path should start with `/resources/`

**File not found (404)?**
- Check file name spelling (case sensitive!)
- Make sure file was copied to the correct folder
- Restart the dev server: `npm run dev`

**Page showing "Coming Soon"?**
- This means no `filePath` or `externalUrl` is set
- Update the resource in `data/resources.ts`

---

## 📞 Need Help?

Just let me know and I can:
- Add your files for you
- Update the configuration
- Fix any path issues
- Help organize your resources

**Your files stay in your project** - they'll be deployed with your app to Railway!

