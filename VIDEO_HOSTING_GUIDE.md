# Video Hosting Guide for NoTraffic Portal

## Why Videos Aren't in Git

Video files are too large for Git repositories. They're excluded in `.gitignore` and need to be hosted externally for the production site to work.

## 📹 Recommended Solutions

### 1. **YouTube (Best for Most Cases)** ⭐

**Pros:**
- Free and unlimited storage
- Reliable streaming
- Auto-generated thumbnails
- Mobile-optimized
- Can be unlisted (not publicly searchable but accessible via link)

**Steps:**
1. Upload videos to YouTube
2. For each video, click "Share" → "Embed" 
3. Copy the embed URL (looks like: `https://www.youtube.com/embed/dQw4w9WgXcQ`)
4. Update `data/resources.ts`:

```typescript
{
  id: 40,
  title: 'Your Video Title',
  description: 'Video description',
  category: 'videos',
  type: 'Video',
  externalUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID', // Add this
  size: 'N/A',
  pages: null,
  version: '2024',
  updated: '2024-10'
}
```

---

### 2. **Vimeo (More Professional)**

**Pros:**
- More professional appearance
- Better privacy controls
- No ads
- Customizable player

**Cons:**
- Limited free storage (5GB/week)
- Paid plans for more storage

**Steps:**
1. Upload to Vimeo
2. Get embed code
3. Use format: `https://player.vimeo.com/video/VIDEO_ID`

---

### 3. **Cloud Storage (AWS S3, Google Cloud, Azure)**

**Pros:**
- Full control over files
- Direct MP4 hosting
- Can use CDN

**Cons:**
- Costs money (usually cheap for video storage)
- Requires setup

**Example for AWS S3:**
```typescript
{
  id: 40,
  title: 'Your Video',
  category: 'videos',
  type: 'Video',
  filePath: 'https://your-bucket.s3.amazonaws.com/videos/your-video.mp4',
  size: '25 MB',
  pages: null,
  version: '2024',
  updated: '2024-10'
}
```

---

## 🎬 Current Video Files

Your videos are in `public/resources/videos/` (local only):
- AI_Mobility_Platform.mp4
- Advanced Detection_Far_Zone.mp4
- Pedestrian and Micromobility.mp4
- Truck Detection.mp4
- Heavy Rain.mp4
- Snow.mp4
- Snow and Rain.mp4
- Fog.mp4
- Sun Glare.mp4
- Front Panel Access Demo.mp4
- Optimization Case Study_Subs.mp4
- V2X Current Challenges.mp4
- vTSP.mp4

---

## 🚀 Quick Setup (YouTube)

1. **Create a YouTube Channel** (if you don't have one)
   - Can use "notraffic" or company name

2. **Upload All Videos**
   - Set visibility to "Unlisted" if you want privacy
   - Add good titles and descriptions

3. **Get Embed URLs**
   - For each video, click Share → Embed
   - Copy the `src` URL from the iframe code

4. **Update data/resources.ts**
   - Find each video entry (IDs 40-52)
   - Add the `externalUrl` field with your YouTube embed URL
   - Comment out or remove the `filePath` field

5. **Commit and Push**
   ```bash
   git add data/resources.ts
   git commit -m "Add YouTube embed URLs for videos"
   git push
   ```

---

## 💡 Example Before/After

**Before (Local Only):**
```typescript
{
  id: 40,
  title: 'AI Mobility Platform Overview',
  category: 'videos',
  type: 'Video',
  filePath: '/resources/videos/AI_Mobility_Platform.mp4', // Won't work on Railway
  size: 'N/A',
  version: '2024',
  updated: '2024-10'
}
```

**After (Works Everywhere):**
```typescript
{
  id: 40,
  title: 'AI Mobility Platform Overview',
  category: 'videos',
  type: 'Video',
  externalUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Works on Railway!
  size: 'N/A',
  version: '2024',
  updated: '2024-10'
}
```

---

## 📝 Notes

- **Local Development:** Videos will work from `filePath` when running locally
- **Production (Railway):** Videos need `externalUrl` to work
- **Both:** You can have both `filePath` (for local) and `externalUrl` (for production)
- The app will prefer `externalUrl` if it exists

---

## ✅ Checklist

- [ ] Upload all 13 videos to YouTube/Vimeo
- [ ] Get embed URLs for each video
- [ ] Update `data/resources.ts` with `externalUrl` for each video (IDs 40-52)
- [ ] Test locally to ensure videos play
- [ ] Commit and push changes
- [ ] Test on Railway to confirm videos work in production

---

## 🆘 Need Help?

If you prefer not to use YouTube, let me know and I can help set up:
- Vimeo integration
- AWS S3 bucket with CloudFront CDN
- Other cloud storage solutions

