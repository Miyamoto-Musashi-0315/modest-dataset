# Free Hosting Guide for MODEST Website

## Summary
✅ **23 files** are currently in use
✅ **39 unused files** moved to `images_and_pdfs/unused/` folder

---

## 🚀 Free Hosting Options

### Option 1: GitHub Pages (Recommended - Easiest)

**Steps:**
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository (e.g., `modest-dataset`)
3. Upload all files from your website folder to the repository
4. Go to repository **Settings** → **Pages**
5. Under "Source", select **main branch** and **/ (root)**
6. Click **Save**
7. Your site will be live at: `https://yourusername.github.io/modest-dataset/`

**Custom Domain (Optional):**
- Add a `CNAME` file in the root with your domain name
- Update DNS settings at your domain provider

**Pros:**
- ✅ Completely free
- ✅ Easy to update (just push changes)
- ✅ Custom domain support
- ✅ HTTPS automatically enabled

---

### Option 2: Netlify (Easiest Drag & Drop)

**Steps:**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your entire website folder onto Netlify
3. Your site is live instantly!
4. Get a free subdomain: `your-site-name.netlify.app`

**Custom Domain:**
- Go to **Domain settings** → **Add custom domain**
- Follow DNS instructions

**Pros:**
- ✅ Instant deployment
- ✅ Automatic HTTPS
- ✅ Free SSL certificate
- ✅ Continuous deployment from Git (optional)

---

### Option 3: Vercel (Great for Performance)

**Steps:**
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **Add New Project**
3. Import from Git (GitHub/GitLab) or drag & drop
4. Deploy!

**Pros:**
- ✅ Excellent performance (global CDN)
- ✅ Automatic HTTPS
- ✅ Free custom domain
- ✅ Easy Git integration

---

### Option 4: Cloudflare Pages

**Steps:**
1. Sign up at [cloudflare.com](https://cloudflare.com)
2. Go to **Pages** → **Create a project**
3. Upload your website folder
4. Deploy!

**Pros:**
- ✅ Fast global CDN
- ✅ Free unlimited bandwidth
- ✅ Automatic HTTPS

---

## 📝 Quick Start (GitHub Pages)

### Using Git Command Line:

```bash
cd /home/chikku/Desktop/nv/website

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MODEST dataset website"

# Add your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/modest-dataset.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings!

---

## 🔧 Before Hosting Checklist

- [x] All unused files moved to `unused/` folder
- [ ] Test all links work locally
- [ ] Update GitHub/Hugging Face links when ready
- [ ] Verify all images load correctly
- [ ] Test on mobile devices

---

## 💡 Tips

1. **Keep it updated**: Push changes to Git regularly
2. **Use a custom domain**: Makes it more professional
3. **Enable HTTPS**: All platforms do this automatically
4. **Test before going live**: Open `index.html` in browser locally

---

## 📞 Need Help?

- GitHub Pages Docs: https://docs.github.com/pages
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs

