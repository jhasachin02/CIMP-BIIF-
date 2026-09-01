# CIMP-BIIF Website - Form Submission & Deployment Configuration

## IMPORTANT DEPLOYMENT CHECKLIST

### 1. Form Submission Service Configuration
The website has been updated to submit forms to a backend service. You need to configure ONE of the following:

#### Option A: Formspree (Recommended - Free, Simple)
1. Sign up at https://formspree.io/
2. Create a form and get your FORM_ID
3. Replace `YOUR_FORM_ID` in assets/js/clone-enhancements.js (line ~144)
4. Forms will automatically email you submissions

**Setup in code:**
```javascript
const formspreeAction = 'https://formspree.io/f/YOUR_FORM_ID';
```

#### Option B: Vercel Serverless Functions (Recommended for Vercel)
1. Create `/api/submit-form.js` with the following code:
```javascript
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
    
    const { name, email, message } = req.body;
    
    // TODO: Send email via Nodemailer, SendGrid, or Mailgun
    // For now, just log and return success
    console.log('Form submission:', { name, email, message });
    
    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
}
```

#### Option C: Firebase (Full Backend)
1. Set up Firebase project
2. Add Firebase config to index.html
3. Implement Firestore submission handler

**Choose ONE option and update the form handler before deploying!**

---

### 2. Domain Configuration
Before deploying, you MUST replace `yourdomain.com` in these files:
- [ ] `robots.txt` - Line 9
- [ ] `sitemap.xml` - All `<loc>` URLs
- [ ] `_redirects` - If using Netlify
- [ ] `vercel.json` - Already configured ✓

**Quick Find & Replace:**
```
Find: yourdomain.com
Replace: [your-actual-domain]
```

---

### 3. Admin Portal Security
The admin section at `/admin/` has NO authentication. 

**URGENT: Add authentication before going public!**

For Vercel:
1. Create middleware in `_middleware.js`
2. Add Basic Auth or session tokens
3. Protect all admin routes

For Apache/shared hosting:
1. Add `.htaccess` to `/admin/` directory:
```apache
<Directory /admin>
    AuthType Basic
    AuthName "CIMP Admin Portal"
    AuthUserFile /path/to/.htpasswd
    Require valid-user
</Directory>
```

---

### 4. Google Analytics Setup (Optional)
To enable visitor tracking:

1. Create Google Analytics 4 property at https://analytics.google.com/
2. Get your MEASUREMENT_ID (format: G-XXXXXXXXXX)
3. Add this to `<head>` section in index.html and all main pages:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_MEASUREMENT_ID');
</script>
```

---

### 5. Environment Variables (If using serverless functions)
Create `.env.local` for development:
```
NEXT_PUBLIC_FORM_ENDPOINT=/.netlify/functions/submit-form
SENDGRID_API_KEY=your-sendgrid-key
ADMIN_EMAIL=support@cimpbiif.com
```

---

### 6. SSL/HTTPS Certificate
Ensure your domain has:
- [ ] Valid SSL certificate (Let's Encrypt or hosted provider)
- [ ] HTTPS enabled on all pages
- [ ] HTTP redirects to HTTPS

---

### 7. DNS Records to Add
Add these DNS records for optimal performance:

```
Type    Name          Value                    Priority
A       @             [Your Vercel IP]         -
CNAME   www           cname.vercel-dns.com     -
TXT     @             v=spf1 include:vercel.net ~all
CNAME   mail          [Your email provider]    -
```

---

### 8. Email Configuration (For form submissions)
Email submissions will fail unless configured. Choose one:

**SendGrid (Free tier: 100/day)**
- Account: https://sendgrid.com
- API Key needed in serverless function

**Mailgun (Free tier: 1000/month)**
- Account: https://mailgun.com
- Requires domain verification

**Vercel Email Service (Beta)**
- Coming soon - Cloudflare Email Service integration

---

### 9. Image Optimization TODO
Next steps for Phase 2:
- [ ] Convert hero images to WebP format
- [ ] Create responsive image variants (640w, 1024w, 1920w)
- [ ] Implement image lazy loading on all below-fold images
- [ ] Compress all PNG/JPG files (target: 80-85% quality)

Expected improvement: 40-50% reduction in image file size

---

### 10. Testing Before Deploy
Run these tests before going live:

**Functional Tests:**
- [ ] Homepage loads without errors
- [ ] All navigation links work (pages/ paths)
- [ ] Forms submit successfully
- [ ] Mobile menu works on small screens
- [ ] Footer links load correctly

**Performance Tests:**
- [ ] Homepage loads in <3 seconds
- [ ] Lighthouse score >80
- [ ] Mobile Core Web Vitals pass
- [ ] Images load properly

**Security Tests:**
- [ ] No console errors
- [ ] Admin portal is protected (if accessible)
- [ ] HTTPS works on all pages
- [ ] Form data is encrypted

**SEO Tests:**
- [ ] Meta tags are correct
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] robots.txt accessible at /robots.txt
- [ ] Open Graph tags render correctly on social

---

## CRITICAL FIXES COMPLETED ✅

1. ✅ Removed clean URL handler conflict
2. ✅ Fixed navigation link paths (about-us.html → pages/about-us.html)
3. ✅ Updated form submission to backend integration
4. ✅ Created robots.txt
5. ✅ Created sitemap.xml
6. ✅ Removed console logging artifacts
7. ✅ Fixed favicon path inconsistencies

---

## REMAINING HIGH PRIORITY (Fix in Phase 2)

1. Image optimization (WebP, lazy loading, responsive sizes)
2. Admin portal authentication
3. Form backend integration (Formspree/SendGrid setup)
4. Google Analytics configuration
5. Open Graph meta tags for social sharing

---

## DEPLOYMENT COMMANDS

### For Vercel:
```bash
npm install -g vercel
vercel   # Deploy to Vercel
```

### For Netlify:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### For shared hosting (via FTP):
```bash
# Upload all files except:
# - node_modules (if exists)
# - .git folder
# - .env files
# - AUDIT_REPORT.md
```

---

## Support
For questions about deployment:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Formspree: https://formspree.io/help
- SSL: https://letsencrypt.org

---

**Last Updated:** September 1, 2026
**Status:** Ready for deployment with above configuration
**Next Step:** Configure form submission service and domain before going live
