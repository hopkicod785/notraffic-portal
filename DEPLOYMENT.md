# Deployment Guide - NoTraffic Portal

This guide covers deploying the NoTraffic Portal to Railway.

## Prerequisites

- GitHub account (hopkicod785)
- Railway account connected to GitHub
- Repository: `notraffic-portal`

## Step 1: Prepare the Repository

1. Ensure all code is committed and pushed to the `main` branch
2. Verify `package.json` has correct scripts:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start"
     }
   }
   ```

## Step 2: Add PostgreSQL Database to Railway

**IMPORTANT:** Do this BEFORE deploying your app!

1. Go to [Railway.app](https://railway.app) → Your project
2. Click "New" → "Database" → "Add PostgreSQL"
3. Railway creates a database and auto-sets `DATABASE_URL`
4. No configuration needed - it's automatic!

## Step 3: Create Railway Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose the `notraffic-portal` repository
4. Railway will automatically detect it's a Next.js project

## Step 4: Configure Environment Variables

Railway auto-configures `DATABASE_URL`. Optionally add:

```
NEXT_PUBLIC_API_URL=https://api.notraffic.tech
NEXT_PUBLIC_CONTACT_EMAIL=support@notraffic.tech
NEXTAUTH_SECRET=your-random-secret-key
```

## Step 5: Deploy

1. Railway will automatically:
   - Install dependencies (`npm install`)
   - Build the project (`npm run build`)
   - Start the server (`npm start`)

2. Monitor the deployment logs for any issues

3. Once deployed, Railway will provide a URL (e.g., `your-app.railway.app`)

## Step 5: Custom Domain (Optional)

1. In Railway project settings, go to "Settings" > "Domains"
2. Add your custom domain
3. Update DNS records as instructed by Railway

## Step 6: Verify Database Setup

1. Check Railway logs for "Prisma" messages
2. Database tables should auto-create on first deploy
3. Visit `/admin` to see the admin dashboard

## Post-Deployment Checklist

- [ ] PostgreSQL database added to Railway
- [ ] Test all pages load correctly
- [ ] Verify navigation works
- [ ] Test forms (Products inquiry)
- [ ] Submit test data and verify it appears in `/admin`
- [ ] Test Installation Tool
- [ ] Test Register Install form
- [ ] Check Resources page
- [ ] Verify admin dashboard shows submissions
- [ ] Test CSV export functionality
- [ ] Test on mobile devices
- [ ] Verify logo displays correctly
- [ ] Test all interactive elements

## Continuous Deployment

Railway automatically deploys on every push to the main branch:

1. Make changes locally
2. Commit and push to GitHub
3. Railway automatically detects changes and redeploys

## Troubleshooting

### Build Failures

If the build fails:
1. Check Railway logs for error messages
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`

### Runtime Errors

If the app crashes at runtime:
1. Check Railway logs
2. Verify environment variables are set correctly
3. Check for missing files or assets

### Image Not Loading

If the NoTraffic logo doesn't appear:
1. Verify image is in `public/` directory
2. Check image path in code: `/White logo blue icon - no background (1).png`
3. Ensure image was committed to repository

## Rollback

To rollback to a previous deployment:
1. Go to Railway project > Deployments
2. Find the working deployment
3. Click "Redeploy"

## Performance Optimization

After deployment, consider:
- Setting up CDN for static assets
- Enabling HTTP/2
- Configuring caching headers
- Adding monitoring (Railway provides built-in metrics)

## Support

For Railway-specific issues:
- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

For application issues:
- Check GitHub repository issues
- Contact development team

---

## Quick Deploy Commands

If deploying manually or to another platform:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
pm2 start npm --name "notraffic-portal" -- start
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | API endpoint URL | No |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email for forms | No |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable/disable analytics | No |

All variables starting with `NEXT_PUBLIC_` are exposed to the browser.

---

**Last Updated**: October 2024
**Version**: 1.0.0

