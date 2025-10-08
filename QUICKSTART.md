# Quick Start Guide - NoTraffic Portal

Get the NoTraffic Portal running in 3 simple steps!

## 🚀 Running the Application

### Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages (Next.js, React, Tailwind CSS, etc.)

### Step 2: Start Development Server

```powershell
npm run dev
```

### Step 3: Open in Browser

Navigate to: **http://localhost:3000**

That's it! The portal is now running locally.

## 🎯 What You'll See

- **Landing Page**: Beautiful hero section with NoTraffic branding
- **Navigation**: Click through Products, Services, Installation Tool, Resources
- **Interactive Elements**: Hover effects, animations, forms

## 📱 Test Different Views

- **Desktop**: Resize browser to see full layout
- **Mobile**: Use browser dev tools (F12) to test mobile view
- **Tablet**: Test responsive breakpoints

## 🛠️ Available Commands

```powershell
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint
```

## 🎨 Explore the Portal

### Page Navigation
- `/` - Landing page with feature overview
- `/products` - Product catalog with inquiry form
- `/services` - Service offerings and support tiers
- `/installation-tool` - Interactive assessment tool
- `/resources` - Manuals, guides, and documentation

### Try These Features
1. **Products Page**: Fill out the inquiry form
2. **Installation Tool**: Complete the 6-step assessment
3. **Resources**: Use the search bar to find resources
4. **Navigation**: Test the mobile menu (resize browser)

## 🔧 Troubleshooting

### Issue: Port 3000 already in use
```powershell
# Use a different port
npm run dev -- -p 3001
```

### Issue: Dependencies not installing
```powershell
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules
npm install
```

### Issue: Build errors
```powershell
# Check for TypeScript errors
npm run build
```

## 📝 Making Changes

1. Edit files in `app/` directory for pages
2. Edit files in `components/` for reusable components
3. Changes auto-reload in development mode
4. Check browser console for any errors

## 🌐 Browser Support

Works best in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📚 Next Steps

- Read **README.md** for full documentation
- Read **FEATURES.md** for feature details
- Read **DEPLOYMENT.md** when ready to deploy
- Read **PROJECT_SUMMARY.md** for project overview

## ⚡ Performance Tips

Development mode is slower than production. For best performance:

```powershell
npm run build
npm start
```

This runs the optimized production build.

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to modify the color scheme

### Change Content
- Landing page: `app/page.tsx`
- Products: `app/products/page.tsx`
- Services: `app/services/page.tsx`
- Installation Tool: `app/installation-tool/page.tsx`
- Resources: `app/resources/page.tsx`

### Change Logo
Replace `public/White logo blue icon - no background (1).png`

## 🆘 Need Help?

- Check documentation files in the root directory
- Review code comments in source files
- Check Next.js documentation: https://nextjs.org/docs

---

## 🎉 You're All Set!

The NoTraffic Portal is ready to use. Explore all the features and when you're ready, follow **DEPLOYMENT.md** to deploy to Railway.

**Happy coding! 🚀**

