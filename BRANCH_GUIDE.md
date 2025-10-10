# Git Branch Management Guide

## 🌳 Your Branches

You now have 3 branches to keep your work safe:

| Branch | Purpose | Status |
|--------|---------|--------|
| **`main`** | Production (live on Railway) | Your working version ✅ |
| **`backup-working-version`** | Backup of working version | Frozen backup 🔒 |
| **`development`** | Your updates & experiments | Active development 🚧 |

---

## 🎯 Current Status

You are now on: **`development`** branch

**What this means:**
- ✅ You can make ANY changes safely
- ✅ Your working version (`main`) is untouched
- ✅ Railway still shows the working version
- ✅ You can always go back

---

## 📝 How to Work on Updates

### Make Your Changes:
1. Edit any files you want
2. Test locally with `npm run dev`
3. Commit when ready:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

### Your changes are ONLY on the `development` branch!

---

## 🔄 Switching Between Branches

### View Working Version:
```bash
git checkout main
```
This switches to your working version (what's on Railway now)

### Go Back to Development:
```bash
git checkout development
```
Back to making updates

### View Backup:
```bash
git checkout backup-working-version
```
See the frozen backup (read-only reference)

### See All Branches:
```bash
git branch
```
Shows which branch you're on (marked with `*`)

---

## 🚀 When Ready to Deploy Updates

### Option 1: Merge Development into Main (Recommended)
```bash
# First, make sure development is committed
git add .
git commit -m "Final updates"

# Switch to main
git checkout main

# Merge your updates
git merge development

# Deploy to Railway
git push origin main
```

### Option 2: Test on Railway First
You can push the development branch to Railway to test:
```bash
# While on development branch
git push origin development
```
Then in Railway dashboard, change the branch to `development` to test it live.

---

## 🆘 Emergency: Restore Working Version

If something goes wrong:

### Restore from Main:
```bash
git checkout main
git push origin main --force
```

### Restore from Backup:
```bash
git checkout backup-working-version
git checkout -b main-restored
git push origin main-restored
```
Then change Railway to use `main-restored` branch.

---

## 💡 Best Practices

1. **Always commit before switching branches:**
   ```bash
   git add .
   git commit -m "Work in progress"
   ```

2. **Check which branch you're on:**
   ```bash
   git branch
   ```
   The one with `*` is active.

3. **Keep main clean:**
   - Only merge tested changes
   - Main = what's live on Railway

4. **Experiment freely on development:**
   - Try anything!
   - Can always delete and start fresh

---

## 🎨 Visual Flow

```
main (Railway Live) ────────────────> [Working Version]
                                              │
                                              ├─> backup-working-version [Frozen Backup]
                                              │
                                              └─> development [Your Updates]
                                                       │
                                                       └─> (when ready) Merge back to main
```

---

## ⚡ Quick Commands Cheat Sheet

| Action | Command |
|--------|---------|
| See current branch | `git branch` |
| Switch to main | `git checkout main` |
| Switch to development | `git checkout development` |
| Commit changes | `git add . && git commit -m "message"` |
| Push current branch | `git push origin $(git branch --show-current)` |
| Merge dev into main | `git checkout main && git merge development` |

---

## ✅ You're All Set!

**Right now:**
- ✅ You're on `development` branch
- ✅ Make any changes you want
- ✅ Your working version is safe on `main`
- ✅ You have a backup on `backup-working-version`

**Next steps:**
1. Make your updates
2. Test locally
3. When happy, merge to `main` and push to Railway

**Need help?** Just ask! 🚀

