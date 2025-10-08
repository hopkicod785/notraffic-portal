# Database Schema - Visual Guide

## 📊 Data Structure Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    NOTRAFFIC PORTAL DATABASE                 │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────┐
│   ProductInquiry         │  ← From /products inquiry form
├──────────────────────────┤
│ id          (unique)     │
│ name        (required)   │
│ email       (required)   │
│ company     (optional)   │
│ phone       (optional)   │
│ product     (required)   │  ← Which product they're interested in
│ message     (required)   │  ← Their inquiry message
│ status      (new/...)    │  ← Track follow-up status
│ createdAt   (timestamp)  │
│ updatedAt   (timestamp)  │
└──────────────────────────┘

┌──────────────────────────┐
│ InstallationAssessment   │  ← From /installation-tool
├──────────────────────────┤
│ id              (unique) │
│ deploymentType  (string) │  ← single, multiple, corridor, etc.
│ cabinetType     (array)  │  ← Selected cabinet types
│ intersections   (number) │  ← How many intersections
│ equipment       (json)   │  ← Equipment quantities:
│                          │     - nexusUnit
│                          │     - sensorPowerUnit
│                          │     - type1Sensor
│                          │     - type2Sensor
│ auxiliary       (json)   │  ← Auxiliary equipment:
│                          │     - shelfMountKit
│                          │     - rackMountKit
│                          │     - wifiRepeater
│                          │     - c1Harness
│ timeline        (string) │  ← Implementation timeline
│ createdAt       (timestamp)
│ updatedAt       (timestamp)
└──────────────────────────┘

┌──────────────────────────┐
│ InstallationRegistration │  ← From /register-install
├──────────────────────────┤
│ id                (unique)
│ agency            (required)  ← Agency name
│ distributor       (required)  ← Distributor name
│ intersections     (text)      ← Intersection names (can be multiple)
│ estimatedDate     (date)      ← When installation will happen
│ cabinetType       (array)     ← Selected cabinet types
│ signalPhasingFiles (array)   ← Uploaded file names/paths
│ signalTimingFiles  (array)   ← Uploaded file names/paths
│ firstName         (required)
│ lastName          (required)
│ email             (required)
│ phone             (required)
│ status            (pending/in-progress/completed)
│ createdAt         (timestamp)
│ updatedAt         (timestamp)
└──────────────────────────┘
```

## 🔄 Data Relationships

```
Portal Page          →  API Endpoint                    →  Database Table
─────────────────────────────────────────────────────────────────────────────
/products            →  /api/product-inquiry           →  ProductInquiry
/installation-tool   →  /api/installation-assessment   →  InstallationAssessment
/register-install    →  /api/installation-registration →  InstallationRegistration

All accessible from:  /admin  (Admin Dashboard)
```

## 📝 Field Descriptions

### ProductInquiry Table

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | String | Customer full name | "John Doe" |
| `email` | String | Customer email | "john@city.gov" |
| `company` | String? | Organization | "City of Springfield" |
| `phone` | String? | Contact number | "+1 555-123-4567" |
| `product` | String | Product interested in | "Emergency Vehicle Preemption (EVP)" |
| `message` | Text | Customer inquiry | "We need EVP for 5 intersections..." |
| `status` | String | Follow-up status | "new", "contacted", "completed" |

### InstallationAssessment Table

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `deploymentType` | String | Deployment scale | "single", "multiple", "corridor" |
| `cabinetType` | String[] | Cabinet types | ["type-170", "nema-ts1"] |
| `intersections` | Integer | Number of intersections | 5 |
| `equipment` | JSON | Equipment quantities | `{"nexusUnit": 5, "type1Sensor": 20}` |
| `auxiliary` | JSON | Auxiliary equipment | `{"wifiRepeater": 2}` |
| `timeline` | String | Implementation timeline | "urgent", "standard", "planned" |

### InstallationRegistration Table

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `agency` | String | Agency name | "Department of Transportation" |
| `distributor` | String | Distributor | "ABC Traffic Solutions" |
| `intersections` | Text | Intersection names | "Main & 1st\nElm & 2nd" |
| `estimatedDate` | DateTime | Install date | "2024-12-15" |
| `cabinetType` | String[] | Cabinet types | ["type-2070"] |
| `signalPhasingFiles` | String[] | Uploaded files | ["phasing-plan.pdf"] |
| `signalTimingFiles` | String[] | Uploaded files | ["timing-sheet.xlsx"] |
| `firstName` | String | Contact first name | "Jane" |
| `lastName` | String | Contact last name | "Smith" |
| `email` | String | Contact email | "jane@agency.gov" |
| `phone` | String | Contact phone | "+1 555-987-6543" |
| `status` | String | Installation status | "pending", "in-progress", "completed" |

## 🎯 Using the Data

### For Sales Follow-Up:

1. **Check Product Inquiries:**
   - See who's interested in what
   - Contact details readily available
   - Message shows their specific needs

2. **Use Assessment Data:**
   - See equipment quantities needed
   - Prepare accurate quotes
   - Understand deployment scale

3. **Export to CRM:**
   - Download CSV
   - Import into Salesforce, HubSpot, etc.
   - Track through your existing pipeline

### For Operations:

1. **Monitor Registrations:**
   - See upcoming installations
   - Review equipment needs
   - Access technical files
   - Plan resources

2. **Track Progress:**
   - Update status as installation progresses
   - Coordinate with field teams
   - Manage schedules

### For Management:

1. **Pipeline Visibility:**
   - See all prospects
   - Track conversion funnel
   - Forecast installations

2. **Reporting:**
   - Export data for analysis
   - Track response times
   - Measure marketing effectiveness

## 🔧 Customization

### Add New Fields:

1. Update `prisma/schema.prisma`
2. Add field to relevant model
3. Run: `npx prisma migrate dev`
4. Update form and dashboard

### Change Status Options:

Edit the status field in your application code to add custom statuses like:
- "qualified", "proposal-sent", "closed-won", etc.

## 📱 Mobile Access

The admin dashboard is fully responsive:
- ✅ Works on tablets
- ✅ Works on phones
- ✅ Touch-friendly interface
- ✅ Full functionality

Access from anywhere to stay on top of leads!

## 🎓 Best Practices

### Daily:
- [ ] Check new submissions
- [ ] Respond to inquiries within 24 hours
- [ ] Update statuses after contact

### Weekly:
- [ ] Export data for backup
- [ ] Review pending registrations
- [ ] Generate pipeline reports

### Monthly:
- [ ] Archive completed items
- [ ] Analyze conversion rates
- [ ] Review and optimize

## 🆘 Common Questions

**Q: Can I delete test data?**
A: Yes, use Prisma Studio (`npx prisma studio`) to delete individual records.

**Q: How do I search for specific data?**
A: Use browser search (Ctrl+F) or export CSV and use Excel/Sheets filters.

**Q: Can multiple people access the dashboard?**
A: Yes! Anyone with the URL can access (add authentication for security).

**Q: What if I accidentally delete data?**
A: Railway creates automatic backups. Data can be restored.

**Q: Can I integrate with my CRM?**
A: Yes! Export CSV or use the API endpoints to pull data programmatically.

---

## 🚀 You're Ready!

Your admin dashboard is fully functional and ready to use. Every form submission is automatically captured and available for review!

**Access it now:** `http://localhost:3000/admin`

Submit a test form and watch it appear in the dashboard! 🎉

