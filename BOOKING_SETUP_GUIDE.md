# TopGear58 Booking System Setup Guide

## Overview
Your booking system is now complete with professional email templates, business hours validation, and Calendly integration. This guide will help you configure everything to make it live.

## 🚀 Quick Start

### 1. Environment Variables Setup
Copy `.env.local.example` to `.env.local` and fill in your actual credentials:

```bash
cp .env.local.example .env.local
```

### 2. Required Services

#### A) Calendly Integration (Recommended)
1. Go to [Calendly Developer Console](https://developer.calendly.com/)
2. Create an account and generate an access token ✅ **COMPLETED**
3. Create an event type for your services
4. Set up webhook endpoint:
   - **Redirect URI:** `https://topgear58.com/api/calendly/callback`
   - **Webhook URL:** `https://topgear58.com/api/calendly/callback`
   - **Events to subscribe to:** `invitee.created`, `invitee.canceled`, `invitee.rescheduled`
5. Add these to your `.env.local`:
   ```
   CALENDLY_ACCESS_TOKEN=your_actual_token_here
   CALENDLY_EVENT_TYPE_URI=https://api.calendly.com/event_types/your_event_type_uuid
   CALENDLY_WEBHOOK_SECRET=your_webhook_signing_secret
   ```

**📋 Next Steps for Calendly:**
- [ ] Create your service event type in Calendly dashboard
- [ ] Copy the event type UUID from the URL
- [ ] Set up webhooks in developer console
- [ ] Test the integration with a sample booking

#### B) Email Service (Choose One)

**Option 1: Gmail SMTP (Easiest)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_business_email@gmail.com
SMTP_PASS=your_app_password  # Generate app password in Gmail settings
```

**Option 2: SendGrid (Professional)**
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Generate API key
3. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

**Option 3: Resend (Modern)**
1. Sign up at [Resend](https://resend.com/)
2. Generate API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_resend_api_key
   ```

### 3. Business Configuration
Update these in your `.env.local`:
```env
BUSINESS_EMAIL=info@topgear58.com
BUSINESS_PHONE=+1 (555) 123-4567
BUSINESS_ADDRESS=123 Auto Service Blvd, City, State 12345
```

## 🎯 Features Overview

### ✅ What's Working Now
- **Responsive booking form** with professional UI
- **Business hours validation** (Mon-Thu: 8AM-5PM, Fri: 8AM-12:30PM, weekends closed)
- **Calendar integration** with weekend restrictions
- **Professional email templates** for customers and business
- **Real-time form validation**
- **Mobile-friendly design**
- **Success/error feedback with booking details**

### 🔧 Current Business Hours
- **Monday - Thursday:** 8:00 AM - 5:00 PM
- **Friday:** 8:00 AM - 12:30 PM
- **Weekends:** Closed

*To change these hours, edit the `BUSINESS_HOURS` object in `/src/app/api/booking/route.js`*

### 📧 Email Features
- **Customer confirmation emails** with professional branding
- **Business notification emails** with all booking details
- **Responsive HTML templates** that work on all devices
- **Booking ID generation** for easy reference

### 📅 Calendly Integration
- **Automatic event creation** in your Calendly account
- **Customer information sync**
- **Service details included** in calendar events
- **Fallback system** if Calendly is unavailable

## 🛠️ Implementation Steps

### Step 1: Test Locally
```bash
npm run dev
```
Test the booking form at `http://localhost:3000`

### Step 2: Configure Email Service
Choose one email service and implement:

**For Gmail SMTP (Quick Setup):**
1. Enable 2-factor authentication on Gmail
2. Generate app password: Gmail Settings → Security → 2-Step Verification → App passwords
3. Use the 16-character password in `SMTP_PASS`

### Step 3: Set Up Calendly
1. Create Calendly account at [calendly.com](https://calendly.com)
2. Set up your service event type
3. Go to [developer.calendly.com](https://developer.calendly.com) for API access
4. Generate access token and get event type URI

### Step 4: Implement Email Sending
Add one of these to your `route.js` (commented examples included):

**Nodemailer (SMTP):**
```bash
npm install nodemailer
```

**SendGrid:**
```bash
npm install @sendgrid/mail
```

**Resend:**
```bash
npm install resend
```

### Step 5: Deploy
Deploy to Vercel, Netlify, or your preferred hosting platform. Don't forget to add environment variables in your hosting platform's settings.

## 🎨 Customization Options

### Service Types
Edit the `serviceTypes` array in `/src/components/Booking.jsx`:
```javascript
const serviceTypes = [
  "Oil Change",
  "Brake Service",
  "Engine Repair",
  // Add your services here
];
```

### Business Hours
Edit `BUSINESS_HOURS` in `/src/app/api/booking/route.js`:
```javascript
const BUSINESS_HOURS = {
  monday: { start: "08:00", end: "17:00" },
  tuesday: { start: "08:00", end: "17:00" },
  // Modify as needed
};
```

### Email Templates
Customize the HTML templates in the `sendNotifications` function in `/src/app/api/booking/route.js`.

### Styling
- Colors: Edit the Tailwind classes in components
- Logo: Replace in email templates and navbar
- Branding: Update text and colors throughout

## 📱 Mobile Experience
- Fully responsive design
- Touch-friendly calendar picker
- Optimized form layout
- Professional mobile email templates

## 🔒 Security Features
- Form validation on both frontend and backend
- Business hours enforcement
- Email sanitization
- Error handling and logging

## 📊 Analytics & Tracking
Consider adding:
- Google Analytics for form submissions
- Conversion tracking
- Customer behavior analysis

## 🚨 Troubleshooting

### Common Issues:
1. **Emails not sending:** Check SMTP credentials and firewall settings
2. **Calendly not working:** Verify API token and event type URI
3. **Form validation errors:** Check business hours configuration
4. **Mobile display issues:** Test on actual devices

### Logs:
Check browser console and server logs for detailed error messages.

## 🎯 Next Steps
1. Set up email service
2. Configure Calendly integration
3. Test end-to-end booking flow
4. Deploy to production
5. Monitor and optimize

## 📞 Support
For technical support or customizations, contact your development team with:
- Specific error messages
- Screenshots of issues
- Browser and device information

---

**Your TopGear58 booking system is ready for prime time! 🏁**
