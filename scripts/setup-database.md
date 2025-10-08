# Database Setup Instructions

## Quick Start (Local Development)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set up Environment Variables

Create a `.env` file in the project root:

```env
# Database URL (use your local PostgreSQL or Railway URL)
DATABASE_URL="postgresql://username:password@localhost:5432/notraffic_portal"

# NextAuth (not required for basic setup, but recommended)
NEXTAUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 3: Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push
```

### Step 4: (Optional) Open Database GUI

```bash
# Opens Prisma Studio at http://localhost:5555
npx prisma studio
```

## Railway Deployment

### Automatic Setup:

1. **Add PostgreSQL to Railway:**
   - In Railway project, click "New" → "Database" → "PostgreSQL"
   - Railway automatically sets `DATABASE_URL`

2. **Deploy your app:**
   - Railway automatically runs `npx prisma generate` (via postinstall script)
   - Database tables are created automatically

3. **Access admin dashboard:**
   - Visit: `https://your-app.railway.app/admin`

### Manual Database Push (if needed):

In Railway console:
```bash
npx prisma db push
```

## Verify Setup

1. **Check database connection:**
   ```bash
   npx prisma db pull
   ```

2. **View tables:**
   ```bash
   npx prisma studio
   ```

3. **Test submission:**
   - Fill out a form on the portal
   - Check admin dashboard at `/admin`
   - Data should appear!

## Database Schema

The database includes these tables:

- `ProductInquiry` - Product inquiry forms
- `InstallationAssessment` - Installation tool assessments
- `InstallationRegistration` - Install registration forms
- `AdminUser` - Admin user accounts (future)

## Troubleshooting

### Error: "Can't reach database server"
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify network connectivity

### Error: "Environment variable not found: DATABASE_URL"
- Create `.env` file with DATABASE_URL
- Restart dev server

### No data in admin dashboard
- Submit a test form
- Check browser console for errors
- Verify API routes are working
- Check database with Prisma Studio

## Production Checklist

- [ ] PostgreSQL database created on Railway
- [ ] DATABASE_URL environment variable set
- [ ] Prisma client generated (`npm run postinstall`)
- [ ] Database tables created (`npx prisma db push`)
- [ ] Test form submission
- [ ] Verify data in admin dashboard
- [ ] Set up backups (Railway automatic)

---

**Ready!** Your admin dashboard is at `/admin` 🚀

