# Form Submission Handler Configuration
# This file documents how to set up form submission for CIMP-BIIF website

## QUICK START - FORMSPREE (Recommended)

### Step 1: Create Formspree Account
1. Visit https://formspree.io/
2. Sign up with your email
3. Create a new form
4. Get your Form ID (looks like: YOUR_FORM_ID)

### Step 2: Update Your Website
In `assets/js/clone-enhancements.js`, find line ~144 and update:

```javascript
// OLD CODE:
const formspreeAction = 'https://formspree.io/f/YOUR_FORM_ID';

// NEW CODE:
const formspreeAction = 'https://formspree.io/f/abc123def456'; // Replace with your actual ID
```

### Step 3: Test
Submit a test form from:
- http://yourdomain.com/pages/incubation-registration.html
- http://yourdomain.com/pages/mentor-registration.html
- http://yourdomain.com/pages/contact-us.html

You should receive an email immediately!

---

## ALTERNATIVE 1: Vercel Serverless Functions

### Step 1: Create serverless function
Create file: `/api/submit-form.js`

```javascript
/**
 * Vercel Serverless Function
 * Handles form submissions and sends emails
 */

import nodemailer from 'nodemailer';

// Configure your email service (Gmail, SendGrid, Mailgun, etc.)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export default async function handler(req, res) {
    // Only accept POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed. Use POST.'
        });
    }

    try {
        const { name, email, phone, company, message, formType } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Required fields missing: name, email, message'
            });
        }

        // Prepare email content
        const emailContent = `
            <h2>New Form Submission - ${formType || 'General Inquiry'}</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `;

        // Send email to admin
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: process.env.ADMIN_EMAIL,
            subject: `CIMP-BIIF Form Submission: ${formType || 'New Inquiry'}`,
            html: emailContent,
        });

        // Send confirmation email to user
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'CIMP-BIIF - We received your inquiry',
            html: `
                <h2>Thank you for contacting CIMP-BIIF</h2>
                <p>Dear ${name},</p>
                <p>We have received your submission. Our team will review it and get back to you within 24-48 hours.</p>
                <p>In the meantime, feel free to explore our website or contact us directly:</p>
                <p>
                    <strong>Email:</strong> support@cimpbiif.com<br>
                    <strong>Phone:</strong> +91 9128912345
                </p>
                <p>Best regards,<br>CIMP-BIIF Team</p>
            `,
        });

        // Return success
        return res.status(200).json({
            success: true,
            message: 'Form submitted successfully. Check your email for confirmation.'
        });

    } catch (error) {
        console.error('Form submission error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error processing form. Please try again later.'
        });
    }
}
```

### Step 2: Add Environment Variables
Create `.env.local`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@cimpbiif.com
ADMIN_EMAIL=support@cimpbiif.com
```

### Step 3: Update form handler
In `assets/js/clone-enhancements.js`, update endpoint:
```javascript
fetch('/.netlify/functions/submit-form', {
    // Change to:
    fetch('/api/submit-form', {
```

---

## ALTERNATIVE 2: SendGrid Integration

### Step 1: Create SendGrid Account
1. Sign up at https://sendgrid.com/
2. Create API key
3. Verify sender email address

### Step 2: Create Vercel Function
File: `/api/send-email.js`

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false });
    }

    try {
        const { name, email, message } = req.body;

        const msg = {
            to: process.env.ADMIN_EMAIL,
            from: process.env.FROM_EMAIL,
            subject: 'New CIMP-BIIF Form Submission',
            html: `
                <h2>New Submission</h2>
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        await sgMail.send(msg);

        return res.status(200).json({
            success: true,
            message: 'Form submitted successfully'
        });
    } catch (error) {
        console.error('SendGrid error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error sending email'
        });
    }
}
```

### Step 3: Environment Variables
```
SENDGRID_API_KEY=SG.your-api-key-here
FROM_EMAIL=noreply@cimpbiif.com
ADMIN_EMAIL=support@cimpbiif.com
```

---

## ALTERNATIVE 3: Firebase Integration

### Step 1: Setup Firebase
1. Create project at https://firebase.google.com/
2. Enable Firestore Database
3. Enable Authentication (if needed)
4. Get your Firebase config

### Step 2: Create `config/firebase.js`
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
```

### Step 3: Update Form Handler
```javascript
import { db, collection, addDoc } from './config/firebase';

// In form submission:
try {
    const docRef = await addDoc(collection(db, 'form_submissions'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
        formType: formType
    });
    window.showToast("Success!", "Form submitted");
} catch (error) {
    window.showToast("Error", "Failed to submit");
}
```

---

## Form Validation Enhancements

Update `assets/js/clone-enhancements.js` to add better validation:

```javascript
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// In form handler:
const emailField = form.querySelector('[type="email"]');
if (emailField && !validateEmail(emailField.value)) {
    emailField.classList.add('is-invalid');
    valid = false;
}

const phoneField = form.querySelector('[type="tel"]');
if (phoneField && phoneField.value && !validatePhone(phoneField.value)) {
    phoneField.classList.add('is-invalid');
    valid = false;
}
```

---

## Testing Your Form

### Local Testing
```bash
# Test with Formspree
curl -X POST https://formspree.io/f/YOUR_FORM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test"
  }'
```

### Form Testing Tools
1. **Formspree Dashboard:** https://formspree.io/forms
2. **Vercel Logs:** `vercel logs`
3. **Firebase Console:** https://console.firebase.google.com/
4. **Browser DevTools:** Check Network tab and Console

---

## Troubleshooting

### Forms not submitting?
- [ ] Check browser console for JavaScript errors
- [ ] Verify form endpoint is correct
- [ ] Check CORS settings (if using external service)
- [ ] Ensure all required fields have `required` attribute

### Emails not received?
- [ ] Check spam folder
- [ ] Verify sender email is authorized
- [ ] Check API key/credentials are valid
- [ ] Review service logs (Formspree/SendGrid/etc)

### Slow form submission?
- [ ] Implement loading indicator
- [ ] Add timeout error handling (30 seconds)
- [ ] Consider queue system for high traffic

---

## RECOMMENDED SETUP FOR YOU

**Best for beginners:** Formspree (5 minutes setup)
**Best for scale:** Vercel + SendGrid (30 minutes setup)
**Best for full control:** Firebase + Nodemailer (1 hour setup)

---

## Next Steps

1. [ ] Choose one form submission method
2. [ ] Set up account/credentials
3. [ ] Update code with your API keys
4. [ ] Test form submission
5. [ ] Deploy to production
6. [ ] Monitor first week for issues

---

**Support:**
- Formspree Help: https://formspree.io/help
- SendGrid Docs: https://docs.sendgrid.com/
- Firebase Docs: https://firebase.google.com/docs
- Vercel Docs: https://vercel.com/docs

---
**Last Updated:** September 1, 2026
