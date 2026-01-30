# 🚀 Vercel Deployment Guide for ShopHub

## ✅ Pre-Deployment Checklist

Your project is now ready for deployment! All unnecessary files have been removed:
- ❌ Removed: seed.js, reseed.js, quick-seed.js
- ❌ Removed: nodemon.json, access.log
- ❌ Removed: Documentation files (CHANGES.md, SETUP.md, etc.)
- ✅ Added: vercel.json configuration
- ✅ Updated: .gitignore for production

## 📋 What You Need

1. **Vercel Account** - Sign up at https://vercel.com
2. **MongoDB Atlas** - Cloud MongoDB (free tier available)
3. **Stripe Account** - For payments (test mode is fine)
4. **Git Repository** - GitHub/GitLab/Bitbucket

---

## 🔧 Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/shopping_db`)
5. Replace `<password>` with your actual password

---

## 🎯 Step 2: Deploy to Vercel

### Option A: Using Vercel Website (Easiest)

1. **Push code to Git**:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/dashboard
   - Click "Add New" → "Project"
   - Import your Git repository
   - Vercel will auto-detect Node.js app

3. **Configure Environment Variables**:
   In Vercel dashboard, add these variables:
   ```
   MONGODB_URI=mongodb+srv://youruser:yourpass@cluster.mongodb.net/shopping_db
   STRIPE_KEY=sk_test_your_secret_key_here
   STRIPE_PUBLIC_KEY=pk_test_your_public_key_here
   SESSION_SECRET=your-random-secret-string-here
   NODE_ENV=production
   ```

4. **Deploy**: Click "Deploy" and wait for build to complete!

### Option B: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add STRIPE_KEY
   vercel env add STRIPE_PUBLIC_KEY
   vercel env add SESSION_SECRET
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 🔑 Step 3: Get Your API Keys

### Stripe Keys:
1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy:
   - **Secret key** (starts with `sk_test_`) → Use for `STRIPE_KEY`
   - **Publishable key** (starts with `pk_test_`) → Use for `STRIPE_PUBLIC_KEY`

### Session Secret:
Generate a random string (32+ characters):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ⚠️ Important Notes

### 1. Data Directory
The `/data/invoices/` folder won't persist on Vercel (serverless environment). For production, consider:
- Storing PDFs in cloud storage (AWS S3, Cloudinary)
- Generating PDFs on-demand without saving

### 2. Images
Currently using Unsplash CDN (already working). For custom images:
- Use Cloudinary or AWS S3
- Update product image URLs in database

### 3. Session Store
Using MongoDB for sessions (already configured) - works great with Vercel!

### 4. Environment Variables
**NEVER** commit `.env` file to Git. It's in `.gitignore` for security.

---

## 🧪 Testing After Deployment

1. **Visit your Vercel URL** (e.g., `your-app.vercel.app`)
2. **Test user signup/login**
3. **Browse products** (images should load from Unsplash)
4. **Add items to cart**
5. **Test checkout** with Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

---

## 🐛 Troubleshooting

### App not loading:
- Check Vercel deployment logs
- Verify all environment variables are set
- Check MongoDB Atlas whitelist (allow all IPs: `0.0.0.0/0`)

### Stripe not working:
- Ensure public key is correct in checkout page
- Check Vercel logs for errors
- Verify webhook settings (if using webhooks)

### Session issues:
- Verify MongoDB connection string
- Check if SESSION_SECRET is set

### Images not showing:
- Check browser console for CORS errors
- Verify Unsplash URLs are accessible

---

## 📊 Vercel Dashboard

After deployment, monitor your app:
- **Analytics**: View traffic and performance
- **Logs**: Debug issues with real-time logs
- **Deployments**: Rollback if needed
- **Domains**: Add custom domain

---

## 🎉 You're Live!

Your ShopHub e-commerce platform is now live on Vercel!

**Share your link**: `https://your-app-name.vercel.app`

### Next Steps:
- ✅ Add custom domain (Settings → Domains)
- ✅ Setup Stripe webhooks for production
- ✅ Add more products to your catalog
- ✅ Enable analytics and monitoring
- ✅ Switch to Stripe live mode when ready

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Support: https://www.mongodb.com/support
- Stripe Documentation: https://stripe.com/docs

**Good luck with your e-commerce platform! 🚀**
