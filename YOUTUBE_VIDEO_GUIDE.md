# YouTube Video Setup Guide

## 📹 Quick Steps to Add Your Videos

### 1. Upload to YouTube
1. Go to [YouTube Studio](https://studio.youtube.com)
2. Click **"Create"** → **"Upload videos"**
3. Upload all 13 video files
4. Set visibility to **"Unlisted"** if you want them accessible only via link

### 2. Get Embed URLs
For each video after upload:
1. Go to the video
2. Click **"Share"** button
3. Click **"Embed"**
4. Copy the URL from `src="..."` 
   - Should look like: `https://www.youtube.com/embed/abc123xyz`
   - NOT the regular watch URL

### 3. Update the Portal
Open `data/resources.ts` and find each video entry. Replace the empty `externalUrl: ''` with your YouTube URL.

---

## 🎬 Your 13 Videos to Upload

Here's the list with their current local filenames:

| # | Title | Local Filename | YouTube URL (Add After Upload) |
|---|-------|----------------|-------------------------------|
| 1 | AI Mobility Platform Overview | `AI_Mobility_Platform.mp4` | Add to line 266 |
| 2 | Advanced Detection - Far Zone | `Advanced Detection_Far_Zone.mp4` | Add to line 278 |
| 3 | Pedestrian and Micromobility | `Pedestrian and Micromobility.mp4` | Add to line 290 |
| 4 | Truck Detection Demo | `Truck Detection.mp4` | Add to line 302 |
| 5 | Heavy Rain Performance | `Heavy Rain.mp4` | Add to line 314 |
| 6 | Snow Performance | `Snow.mp4` | Add to line 326 |
| 7 | Snow and Rain Performance | `Snow and Rain.mp4` | Add to line 338 |
| 8 | Fog Performance | `Fog.mp4` | Add to line 350 |
| 9 | Sun Glare Performance | `Sun Glare.mp4` | Add to line 362 |
| 10 | Front Panel Access Demo | `Front Panel Access Demo.mp4` | Add to line 374 |
| 11 | Optimization Case Study | `Optimization Case Study_Subs.mp4` | Add to line 386 |
| 12 | V2X Current Challenges | `V2X Current Challenges.mp4` | Add to line 398 |
| 13 | Virtual Transit Signal Priority | `vTSP.mp4` | Add to line 410 |

---

## 📝 Example: How to Update

### Before:
```typescript
{
  id: 40,
  title: 'AI Mobility Platform Overview',
  description: 'Introduction to the NoTraffic AI Mobility Platform',
  category: 'videos',
  type: 'Video',
  externalUrl: '', // ADD YOUTUBE URL: https://www.youtube.com/embed/YOUR_VIDEO_ID
  size: 'N/A',
  pages: null,
  version: '2024',
  updated: '2024-10'
}
```

### After (with your YouTube URL):
```typescript
{
  id: 40,
  title: 'AI Mobility Platform Overview',
  description: 'Introduction to the NoTraffic AI Mobility Platform',
  category: 'videos',
  type: 'Video',
  externalUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Your actual YouTube embed URL
  size: 'N/A',
  pages: null,
  version: '2024',
  updated: '2024-10'
}
```

---

## 🚀 Deploy After Updating

Once you've added all YouTube URLs:

```bash
git add data/resources.ts
git commit -m "Add YouTube embed URLs for all videos"
git push
```

Railway will automatically deploy the changes in 2-3 minutes!

---

## ✅ Testing

After deployment:
1. Go to **https://your-portal.railway.app/resources**
2. Click **"Videos"** filter
3. Videos should now play inline! 🎥

---

## 💡 Tips

- **Unlisted videos** are perfect for this - not searchable but accessible via link
- Use descriptive titles on YouTube that match your portal
- You can organize them in a YouTube playlist for easy management
- Keep the embed URLs handy - you might need them again

---

## 🆘 Need Help?

If you get stuck, just share the YouTube video URLs with me in this format:
```
AI_Mobility_Platform.mp4 = https://www.youtube.com/embed/abc123
Heavy_Rain.mp4 = https://www.youtube.com/embed/def456
...
```

And I'll update the file for you!

