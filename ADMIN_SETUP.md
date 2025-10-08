# Admin Dashboard Setup Guide

This guide explains how to set up the database and access the admin dashboard to manage form submissions.

## 🗄️ Database Setup

The portal uses **PostgreSQL** to store all form submissions. Railway makes this easy!

### Option 1: Railway PostgreSQL (Recommended)

1. **In Railway Dashboard:**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will create a PostgreSQL database
   - Copy the `DATABASE_URL` from the database settings

2. **Set Environment Variable:**
   - In your Railway project settings, add:
   ```
   DATABASE_URL=postgresql://...  (paste from Railway)
   ```

3. **Deploy:**
   - Railway will automatically run database migrations on deploy

### Option 2: Local Development

1. **Install PostgreSQL** on your machine

2. **Create a database:**
   ```sql
   CREATE DATABASE notraffic_portal;
   ```

3. **Create `.env` file in project root:**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/notraffic_portal"
   NEXTAUTH_SECRET="generate-a-random-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

## 📊 What Data Gets Stored

### 1. Product Inquiries
From `/products` page inquiry form:
- Customer name, email, company, phone
- Product of interest
- Message/inquiry details
- Status tracking (new, contacted, completed)
- Timestamp

### 2. Installation Assessments
From `/installation-tool`:
- Deployment type
- Cabinet types
- Number of intersections
- Equipment quantities (Nexus, sensors, etc.)
- Auxiliary equipment
- Timeline preferences
- Timestamp

### 3. Installation Registrations
From `/register-install`:
- Agency and distributor info
- Intersection names
- Estimated install date
- Cabinet types
- Signal phasing files (uploaded)
- Signal timing files (uploaded)
- Contact information
- Status tracking
- Timestamp

## 🔐 Accessing the Admin Dashboard

### Admin Dashboard URL:
```
http://localhost:3000/admin  (local)
https://your-app.railway.app/admin  (production)
```

### Features:
- ✅ **View all product inquiries** with contact details
- ✅ **View installation assessments** with equipment selections
- ✅ **View installation registrations** with full details
- ✅ **Filter by status** (new, contacted, completed, etc.)
- ✅ **Export to CSV** for each data type
- ✅ **Real-time refresh** to see new submissions
- ✅ **Detail view** to see complete JSON data

## 📋 Admin Dashboard Tabs

### Tab 1: Product Inquiries
Shows all product inquiry form submissions:
- Customer information
- Product of interest
- Full message
- Status badge
- Quick view details

### Tab 2: Installation Assessments
Shows all Installation Tool completions:
- Deployment type and intersections
- Equipment quantities selected
- Timeline
- View full recommendations

### Tab 3: Install Registrations
Shows all Register Install submissions:
- Agency and distributor
- Contact information
- Estimated install date
- Intersection details
- Cabinet types
- File uploads (names)

## 🔄 Workflow

### For Product Inquiries:
1. Customer fills form on `/products` page
2. Data saved to database automatically
3. Admin views in dashboard at `/admin`
4. Admin can export to CSV
5. Follow up with customer via email/phone
6. Update status to "contacted" or "completed"

### For Installation Assessments:
1. Customer completes assessment on `/installation-tool`
2. Results shown to customer
3. Data saved in background
4. Admin can view all assessments
5. Export data for analysis
6. Contact customers who need quotes

### For Installation Registrations:
1. Customer registers installation on `/register-install`
2. All details including files saved
3. Admin reviews in dashboard
4. Track status (pending → in-progress → completed)
5. Coordinate with installation team

## 📥 Exporting Data

Click the **"Export CSV"** button in the admin dashboard to download:
- Product inquiries → `product-inquiries.csv`
- Assessments → `installation-assessments.csv`
- Registrations → `installation-registrations.csv`

CSV files can be opened in Excel, Google Sheets, or imported into your CRM.

## 🚀 Railway Deployment Notes

When deploying to Railway:

1. **Add PostgreSQL database** to your project
2. **Environment variables** are auto-configured
3. **Database migrations** run automatically on deploy
4. **Admin dashboard** is immediately accessible

## 🔒 Security Considerations

### Current Setup:
- Admin dashboard is publicly accessible at `/admin`
- Suitable for internal use with network restrictions

### Recommended Enhancements:
1. **Add authentication** (NextAuth already configured)
2. **Password protect admin area**
3. **Add user roles** (view-only, admin, super-admin)
4. **Enable HTTPS** (Railway provides this automatically)
5. **Set up email notifications** for new submissions

## 📧 Email Notifications (Optional)

To get notified of new submissions:

1. **Configure SMTP** in environment variables
2. **Enable in API routes** (commented out by default)
3. **Receive emails** when forms are submitted

## 🔧 Database Management

### View database directly:
```bash
# Connect to your database
npx prisma studio
```

This opens a GUI at `http://localhost:5555` to view/edit data.

### Update database schema:
```bash
# After changing schema.prisma
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

## 📊 Dashboard Features

### Statistics:
- Total submissions per category
- New vs. processed items
- Recent activity

### Actions:
- View full details (JSON view)
- Export to CSV
- Refresh data
- Filter by status (future enhancement)

## 🆘 Troubleshooting

### "Cannot connect to database"
- Check `DATABASE_URL` environment variable
- Ensure PostgreSQL is running
- Verify database exists

### "No data showing in admin"
- Submit a test form
- Click "Refresh" button
- Check browser console for errors

### "API route not found"
- Restart dev server: `npm run dev`
- Check API route files exist in `app/api/`

## 🎯 Next Steps

1. **Set up database** (PostgreSQL on Railway)
2. **Run migrations** (automatic on Railway)
3. **Access admin dashboard** at `/admin`
4. **Test form submission** from any page
5. **View data** in admin dashboard
6. **Export to CSV** as needed

---

**Admin Dashboard URL:** `/admin`
**Database Tool:** `npx prisma studio`
**Deployment:** Automatic with Railway PostgreSQL

